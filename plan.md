Ezra's Network Tool — Modernization Plan
A comprehensive overhaul of the Cornell Johnson social network analysis tool while preserving its core functionality (questionnaire → network metrics → visualization → comparison to benchmarks).

User Review Required
IMPORTANT

Scope decision: This plan calls for substantial changes across the entire stack. We can execute it in phases so you can review after each one. Please confirm the priority order — or tell me if any phase should be skipped or trimmed.

WARNING

Python 2 → 3 migration will break the existing deployment. The current code uses unicode(), xrange(), Python-2 StringIO, and filter() as list. After migration, the old Python 2 runtime will no longer work.

CAUTION

Hardcoded credentials exist in 
decorators.py
 and 
file_utils.py
 (Basic Auth passwords) and 
visualize.py
 (SMTP password). The plan moves these to environment variables.

Phase 1 — Backend Modernization (Python 3 + Code Cleanup)
[MODIFY] 
index.py
Replace StringIO.StringIO() → io.StringIO() (3 occurrences)
Replace unicode() → 
str()
 (lines 56, 76, 104, 195)
Replace xrange() → range() (lines 143, 146, 190)
Remove hardcoded DATABASE_URL on line 20; read from env only
Remove app.debug = True and hardcoded secret_key; load from env
Fix deprecated attachment_filename → download_name for Flask 2.x
[MODIFY] 
aggregate.py
Replace filter() calls (lines 22, 26) with list comprehensions (Python 3 filter returns iterator)
Fix mutable class-level kws = {} in 
Result
 class → move to 
init
[MODIFY] 
visualize.py
Remove import pdb, unused import smtplib, unused import base64
Replace unicode() with 
str()
 (line 99)
Extract email credentials to env vars (or remove email daemon entirely if unused)
Clean up bare except: clause (line 101) → proper exception handling
[MODIFY] 
models.py
No Python 2/3 issues, but clean up the boolean parsing in Connection.__init__
[MODIFY] 
decorators.py
Move hardcoded usernames/passwords to env vars
[MODIFY] 
file_utils.py
Move hardcoded credentials to env vars
Open temp file in text mode ('w') instead of binary ('wb') for Python 3
[MODIFY] 
constants.py
No code changes needed, but will add import os and env‑var patterns if config moves here
[MODIFY] 
requirements.txt
Pin modern versions (Flask 3.x, SQLAlchemy 2.x, etc.)
Add python-dotenv for env‑var loading
[DELETE] 
constants.pyc
[DELETE] 
file_utils.pyc
Remove compiled 
.pyc
 files; add __pycache__/ and *.pyc to .gitignore
Phase 2 — Frontend Redesign (Design System + Modern React)
Guided by the interface-design principles:

4px spacing grid (4, 8, 12, 16, 24, 32, 48, 64)
Consistent depth strategy (elevation via subtle shadows, no arbitrary box-shadows)
Curated color palette — dark mode with Cornell red accent (#B31B1B), neutral grays, success/warning semantic tokens
Modern typography — Inter or similar from Google Fonts
Micro-animations — smooth transitions on hover, page transitions, form step changes
[MODIFY] 
package.json
Upgrade React 15 → React 18, ReactDOM 18
Replace react-select 1.x → latest react-select 5.x
Replace rc-slider → latest version
Add bundler: Vite (replaces manual Babel setup)
Add D3.js (or vis-network) for interactive graphs
[MODIFY] 
static/css/index.css
Complete rewrite with design system approach:

CSS custom properties for colors, spacing, typography, shadows
Dark mode as default with light mode toggle
Responsive grid layout replacing Bootstrap's grid
Component-level styles: cards, buttons, inputs, tables, sliders
Smooth transitions and micro-animations
[MODIFY] 
index.html
 (root)
Add Google Fonts import (Inter)
Remove Bootstrap CSS/JS (replaced by custom design system)
Add viewport meta tag for mobile
Modernize intro copy layout — hero section with animated network illustration
[MODIFY] 
templates/index.html
 (Flask template)
Same modernization as above root index
[MODIFY] 
templates/results.html
Major UX improvements:

Replace raw Bootstrap table with styled card-based comparison
Add color-coded bars (sparklines) for each metric instead of just green/red cells
Group metrics into collapsible sections (Structure, Resources, Trust, Diversity)
Embed the interactive network graph inline (instead of separate PNG route)
Responsive layout for mobile
[MODIFY] 
templates/backend.html
Modern admin panel styling with the design system
Add search/filter to the results table
Thumbnail preview of network maps
React Component Modernization (static/js/src/)
[MODIFY] 
index.js
Convert class component → functional component with hooks (useState, useCallback)
Replace jQuery AJAX → native fetch()
Remove $() DOM manipulation
[MODIFY] 
Questionnaire.js
Redesign as multi-step wizard: step 1 = personal info, step 2 = self-assessment sliders
Add progress indicator
Smooth animations between steps
[MODIFY] 
ConnectionForm.js
Card-based layout for each connection
Inline validation with friendly messages
Animation when adding/removing connections
[MODIFY] 
ConnectionMatrix.js
Visual matrix with drag-to-connect or clickable chips
Live preview of the network as connections are made
[MODIFY] 
Fields.js
[MODIFY] 
Constants.js
[MODIFY] 
Connection.js
[MODIFY] 
TableHeaders.js
Convert to functional components, modernize styling
Phase 3 — Network Visualization Overhaul
[MODIFY] 
visualize.py
Keep as a data endpoint: refactor to return JSON graph data (nodes + edges) instead of PNG
Add new API route /api/graph/<result_id> returning {nodes: [...], edges: [...]}
Remove matplotlib rendering code (or keep as optional PDF export)
Remove watermark logic (move Cornell branding to the web UI)
[NEW] static/js/src/NetworkGraph.js
New client-side interactive network visualization:

D3.js force-directed graph or vis-network
Nodes sized by centrality
Node shapes by organizational context (circle = external, square = same org, triangle = department)
Color by closeness: gradient from cool blue → warm red
Edges: strong ties = thick glowing lines, weak ties = thin dashed lines
Interactive features:
Hover: highlight node + connected edges, show tooltip with name + attributes
Click: select node, dim all non-connected nodes
Zoom and pan
Drag nodes to rearrange
Physics simulation with spring forces
Visual style:
Dark background with glowing nodes
Gradient edges
Subtle particle animation along edges
Smooth entry animation (nodes float in from center)
Phase 4 — Polish & Configuration
[NEW] .env.example
Template for environment variables:

DATABASE_URL=postgresql://...
SECRET_KEY=...
AUTH_USERNAME=...
AUTH_PASSWORD=...
[NEW] .gitignore
__pycache__/
*.pyc
.env
node_modules/
tmp/
instance/
Verification Plan
Automated / Semi-Automated
Python 3 syntax check

bash
python3 -c "import index; print('OK')"
Verifies all .py files parse under Python 3.

Flask route smoke test

bash
curl http://localhost:1997/
Verify the landing page renders without 500 errors.

React bundle builds

bash
npm run build   # (or npx vite build after migration)
Verify the JS bundle compiles without errors.

Manual Verification (User Testing)
Landing page visual check — Open http://localhost:1997/ in browser and verify the modern redesign renders correctly (dark theme, hero section, modern typography)

Questionnaire flow — Fill out Part 1 (personal info) → verify wizard steps animate correctly → add 10+ connections → fill connection matrix → submit

Results page — After submission, verify the comparison table renders with styled cards and the interactive network graph appears embedded on the page

Network graph interaction — Hover nodes (tooltip appears), click nodes (highlights connections), zoom/pan, drag nodes

Backend admin — Navigate to /backend (with auth) and verify the admin table shows entries with the new styling