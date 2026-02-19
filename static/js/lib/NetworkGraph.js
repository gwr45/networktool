'use strict';

/**
 * NetworkGraph — Interactive D3.js force-directed network visualization
 * 
 * Usage: call NetworkGraph.init('#network-graph', resultId)
 * from any page that has the #network-graph container.
 */
(function () {
    'use strict';

    // ── D3 micro-library (force simulation subset) ────────────
    // Since we don't have a bundler for this file, we use a standalone
    // vanilla JS approach with SVG and requestAnimationFrame.

    var COLORS = {
        bg: '#0f1117',
        nodeEgo: '#B31B1B',
        nodeDefault: '#60a5fa',
        nodeHover: '#fbbf24',
        edgeStrong: 'rgba(179, 27, 27, 0.6)',
        edgeWeak: 'rgba(100, 116, 139, 0.3)',
        text: '#e8eaed',
        textMuted: '#6b7280',
        glow: 'rgba(179, 27, 27, 0.4)',
        highlight: '#34d399'
    };

    function closenessToColor(closeness) {
        // Blue (cold, low closeness) → Red (hot, high closeness)
        var r = Math.round(96 + closeness * (248 - 96));
        var g = Math.round(165 - closeness * 165);
        var b = Math.round(250 - closeness * 250);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    function NetworkGraph() {}

    NetworkGraph.init = function (containerSelector, resultId) {
        var container = document.querySelector(containerSelector);
        if (!container) return;

        container.innerHTML = '<p style="color:#6b7280; text-align:center; padding:40px;">Loading network graph…</p>';

        fetch('/api/graph/' + resultId).then(function (r) {
            return r.json();
        }).then(function (data) {
            if (data.error) {
                container.innerHTML = '<p style="color:#f87171; text-align:center; padding:40px;">Error: ' + data.error + '</p>';
                return;
            }
            renderGraph(container, data);
        }).catch(function (err) {
            container.innerHTML = '<p style="color:#f87171; text-align:center; padding:40px;">Failed to load graph data.</p>';
            console.error(err);
        });
    };

    NetworkGraph.initWithData = function (containerSelector, data) {
        var container = document.querySelector(containerSelector);
        if (!container) return;
        renderGraph(container, data);
    };

    function renderGraph(container, data) {
        container.innerHTML = '';

        var width = container.clientWidth || 800;
        var height = Math.max(500, Math.min(700, width * 0.6));

        // ── Create SVG ──────────────────────────────────────────
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
        svg.style.background = COLORS.bg;
        svg.style.borderRadius = '16px';
        svg.style.width = '100%';
        svg.style.height = 'auto';
        svg.style.cursor = 'grab';
        container.appendChild(svg);

        // ── Defs for glow filter ────────────────────────────────
        var defs = createSVG('defs');
        var filter = createSVG('filter', { id: 'glow' });
        var blur = createSVG('feGaussianBlur', { stdDeviation: '3', result: 'blur' });
        var merge = createSVG('feMerge');
        var mergeNode1 = createSVG('feMergeNode', { 'in': 'blur' });
        var mergeNode2 = createSVG('feMergeNode', { 'in': 'SourceGraphic' });
        merge.appendChild(mergeNode1);
        merge.appendChild(mergeNode2);
        filter.appendChild(blur);
        filter.appendChild(merge);
        defs.appendChild(filter);
        svg.appendChild(defs);

        // ── Process data ────────────────────────────────────────
        var nodes = data.nodes.map(function (n, i) {
            return {
                id: n.id,
                isEgo: n.isEgo,
                context: n.context,
                degree: n.degree,
                betweenness: n.betweenness,
                closeness: n.closeness,
                x: width / 2 + (Math.random() - 0.5) * 200,
                y: height / 2 + (Math.random() - 0.5) * 200,
                vx: 0,
                vy: 0,
                radius: n.isEgo ? 20 : Math.max(8, 6 + n.degree * 30)
            };
        });

        var nodeMap = {};
        nodes.forEach(function (n) {
            nodeMap[n.id] = n;
        });

        var edges = data.edges.filter(function (e) {
            return nodeMap[e.source] && nodeMap[e.target];
        }).map(function (e) {
            return {
                source: nodeMap[e.source],
                target: nodeMap[e.target],
                strength: e.strength
            };
        });

        // ── Draw edges ──────────────────────────────────────────
        var edgeGroup = createSVG('g', { class: 'edges' });
        svg.appendChild(edgeGroup);

        var edgeEls = edges.map(function (e) {
            var line = createSVG('line', {
                'stroke': e.strength === 'strong' ? COLORS.edgeStrong : COLORS.edgeWeak,
                'stroke-width': e.strength === 'strong' ? 2.5 : 1,
                'stroke-dasharray': e.strength === 'strong' ? 'none' : '4 4',
                'opacity': '0.8'
            });
            edgeGroup.appendChild(line);
            return { el: line, data: e };
        });

        // ── Draw nodes ──────────────────────────────────────────
        var nodeGroup = createSVG('g', { class: 'nodes' });
        svg.appendChild(nodeGroup);

        var nodeEls = nodes.map(function (n) {
            var g = createSVG('g', { cursor: 'pointer' });

            // Glow circle for ego
            if (n.isEgo) {
                var glowCircle = createSVG('circle', {
                    r: n.radius + 6,
                    fill: COLORS.glow,
                    filter: 'url(#glow)'
                });
                g.appendChild(glowCircle);
            }

            // Main node circle
            var fill = n.isEgo ? COLORS.nodeEgo : closenessToColor(n.closeness);
            var circle = createSVG('circle', {
                r: n.radius,
                fill: fill,
                stroke: 'rgba(255,255,255,0.15)',
                'stroke-width': 1.5
            });
            if (!n.isEgo) {
                circle.setAttribute('filter', 'url(#glow)');
            }
            g.appendChild(circle);

            // Label
            var label = createSVG('text', {
                dy: n.radius + 14,
                'text-anchor': 'middle',
                fill: COLORS.text,
                'font-size': n.isEgo ? '13px' : '10px',
                'font-family': 'Inter, sans-serif',
                'font-weight': n.isEgo ? '700' : '500',
                'pointer-events': 'none',
                opacity: '0.85'
            });
            label.textContent = n.id;
            g.appendChild(label);

            nodeGroup.appendChild(g);

            return { el: g, circle: circle, data: n };
        });

        // ── Tooltip ──────────────────────────────────────────────
        var tooltip = document.createElement('div');
        tooltip.style.cssText = 'position:fixed;background:#1e2130;border:1px solid rgba(255,255,255,0.1);color:#e8eaed;padding:8px 12px;border-radius:8px;font-size:12px;font-family:Inter,sans-serif;pointer-events:none;z-index:9999;opacity:0;transition:opacity 0.15s;box-shadow:0 4px 12px rgba(0,0,0,0.5);';
        document.body.appendChild(tooltip);

        // ── Mouse interactions ───────────────────────────────────
        var selectedNode = null;
        var dragging = null;

        nodeEls.forEach(function (ne) {
            ne.el.addEventListener('mouseenter', function (evt) {
                ne.circle.setAttribute('stroke', COLORS.highlight);
                ne.circle.setAttribute('stroke-width', '3');

                tooltip.innerHTML = '<b>' + ne.data.id + '</b><br>' + 'Degree: ' + (ne.data.degree * 100).toFixed(0) + '%<br>' + 'Betweenness: ' + ne.data.betweenness.toFixed(3) + '<br>' + 'Closeness: ' + ne.data.closeness.toFixed(3);
                tooltip.style.opacity = '1';
                tooltip.style.left = evt.clientX + 12 + 'px';
                tooltip.style.top = evt.clientY - 12 + 'px';

                // Highlight connected edges
                edgeEls.forEach(function (ee) {
                    if (ee.data.source === ne.data || ee.data.target === ne.data) {
                        ee.el.setAttribute('stroke', COLORS.highlight);
                        ee.el.setAttribute('opacity', '1');
                        ee.el.setAttribute('stroke-width', ee.data.strength === 'strong' ? 4 : 2);
                    }
                });
            });

            ne.el.addEventListener('mouseleave', function () {
                ne.circle.setAttribute('stroke', 'rgba(255,255,255,0.15)');
                ne.circle.setAttribute('stroke-width', '1.5');
                tooltip.style.opacity = '0';

                edgeEls.forEach(function (ee) {
                    ee.el.setAttribute('stroke', ee.data.strength === 'strong' ? COLORS.edgeStrong : COLORS.edgeWeak);
                    ee.el.setAttribute('opacity', '0.8');
                    ee.el.setAttribute('stroke-width', ee.data.strength === 'strong' ? 2.5 : 1);
                });
            });

            ne.el.addEventListener('mousemove', function (evt) {
                tooltip.style.left = evt.clientX + 12 + 'px';
                tooltip.style.top = evt.clientY - 12 + 'px';
            });

            // Click to select / dim others
            ne.el.addEventListener('click', function (evt) {
                evt.stopPropagation();
                if (selectedNode === ne.data) {
                    selectedNode = null;
                    resetSelection();
                } else {
                    selectedNode = ne.data;
                    var connectedIds = {};
                    connectedIds[ne.data.id] = true;
                    edges.forEach(function (e) {
                        if (e.source === ne.data) connectedIds[e.target.id] = true;
                        if (e.target === ne.data) connectedIds[e.source.id] = true;
                    });

                    nodeEls.forEach(function (other) {
                        other.el.style.opacity = connectedIds[other.data.id] ? '1' : '0.15';
                    });
                    edgeEls.forEach(function (ee) {
                        var connected = ee.data.source === ne.data || ee.data.target === ne.data;
                        ee.el.style.opacity = connected ? '1' : '0.05';
                    });
                }
            });

            // Drag
            ne.el.addEventListener('mousedown', function (evt) {
                evt.preventDefault();
                dragging = ne.data;
                svg.style.cursor = 'grabbing';
            });
        });

        svg.addEventListener('click', function () {
            selectedNode = null;
            resetSelection();
        });

        document.addEventListener('mousemove', function (evt) {
            if (dragging) {
                var rect = svg.getBoundingClientRect();
                dragging.x = (evt.clientX - rect.left) * (width / rect.width);
                dragging.y = (evt.clientY - rect.top) * (height / rect.height);
                dragging.vx = 0;
                dragging.vy = 0;
            }
        });

        document.addEventListener('mouseup', function () {
            dragging = null;
            svg.style.cursor = 'grab';
        });

        function resetSelection() {
            nodeEls.forEach(function (ne) {
                ne.el.style.opacity = '1';
            });
            edgeEls.forEach(function (ee) {
                ee.el.style.opacity = '0.8';
            });
        }

        // ── Force simulation (simple springs + repulsion) ───────
        var alpha = 1;
        var alphaDecay = 0.005;
        var centerX = width / 2;
        var centerY = height / 2;

        function tick() {
            if (alpha < 0.001 && !dragging) {
                requestAnimationFrame(tick);
                return;
            }
            alpha = Math.max(alpha * (1 - alphaDecay), 0.001);

            // Center gravity
            nodes.forEach(function (n) {
                n.vx += (centerX - n.x) * 0.0005 * alpha;
                n.vy += (centerY - n.y) * 0.0005 * alpha;
            });

            // Repulsion (charge)
            for (var i = 0; i < nodes.length; i++) {
                for (var j = i + 1; j < nodes.length; j++) {
                    var dx = nodes[j].x - nodes[i].x;
                    var dy = nodes[j].y - nodes[i].y;
                    var dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    var repulse = -800 * alpha / (dist * dist);
                    var fx = repulse * dx / dist;
                    var fy = repulse * dy / dist;
                    nodes[i].vx += fx;
                    nodes[i].vy += fy;
                    nodes[j].vx -= fx;
                    nodes[j].vy -= fy;
                }
            }

            // Springs (edges)
            edges.forEach(function (e) {
                var dx = e.target.x - e.source.x;
                var dy = e.target.y - e.source.y;
                var dist = Math.sqrt(dx * dx + dy * dy) || 1;
                var targetLen = e.strength === 'strong' ? 100 : 160;
                var force = (dist - targetLen) * 0.003 * alpha;
                var fx = force * dx / dist;
                var fy = force * dy / dist;
                e.source.vx += fx;
                e.source.vy += fy;
                e.target.vx -= fx;
                e.target.vy -= fy;
            });

            // Apply velocity + damping
            nodes.forEach(function (n) {
                if (n === dragging) return;
                n.vx *= 0.6;
                n.vy *= 0.6;
                n.x += n.vx;
                n.y += n.vy;
                // Boundary
                n.x = Math.max(n.radius, Math.min(width - n.radius, n.x));
                n.y = Math.max(n.radius, Math.min(height - n.radius, n.y));
            });

            // Update SVG elements
            edgeEls.forEach(function (ee) {
                ee.el.setAttribute('x1', ee.data.source.x);
                ee.el.setAttribute('y1', ee.data.source.y);
                ee.el.setAttribute('x2', ee.data.target.x);
                ee.el.setAttribute('y2', ee.data.target.y);
            });

            nodeEls.forEach(function (ne) {
                ne.el.setAttribute('transform', 'translate(' + ne.data.x + ',' + ne.data.y + ')');
            });

            requestAnimationFrame(tick);
        }

        // ── Entry animation ─────────────────────────────────────
        svg.style.opacity = '0';
        svg.style.transition = 'opacity 0.6s ease';
        setTimeout(function () {
            svg.style.opacity = '1';
        }, 50);

        requestAnimationFrame(tick);

        // ── Resize handler ──────────────────────────────────────
        window.addEventListener('resize', function () {
            var newWidth = container.clientWidth || 800;
            var newHeight = Math.max(500, Math.min(700, newWidth * 0.6));
            svg.setAttribute('width', newWidth);
            svg.setAttribute('height', newHeight);
            svg.setAttribute('viewBox', '0 0 ' + newWidth + ' ' + newHeight);
        });
    }

    // ── SVG element helper ──────────────────────────────────
    function createSVG(tag, attrs) {
        var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        if (attrs) {
            for (var key in attrs) {
                el.setAttribute(key, attrs[key]);
            }
        }
        return el;
    }

    // Export
    if (typeof window !== 'undefined') {
        window.NetworkGraph = NetworkGraph;
    }
})();