import React from 'react';

class TableHeader1 extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <tr>
        <th>Connection Name</th>
        <th>What type of resource do you primarily receive from this relationship?</th>
        <th>How close is this relationship?</th>
        <th>From what context do you know this person?</th>
        <th>How does this individual's position compare to your own?</th>
        <th>How frequently do you interact with this individual?</th>
      </tr>
    )
    /*'*/
  }
}

class TableHeader2 extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
    <tr>
    <th>Connection Name</th>
    <th>Check this box if this person is a different gender than you.</th>
    <th>Check this box if this person is a different race than you.</th>
    <th>How old is the person? (Best guess in years)</th>
    <th>How many years have you had this relationship?</th>
    <th>I feel comfortable: sharing my personal problems and difficulties with this person.</th>
    <th>...sharing my hopes and dreams with this person.</th>
    </tr>
  )
  }
}

class TableHeader3 extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
    <tr>
    <th>Connection Name</th>
 <th>I trust this person: to complete a task that he/she has agreed to do for me.</th>
    <th>...to have the knowledge and competence for getting tasks done.</th>
 <th>(Scale of 1-5) I feel obliged if this person asks a favor that: requires 1 hour of my time in a busy week.</th>
    <th>...requires 1 day of my time in a busy week.</th>
    <th>...requires me to inconvenience others.</th>
    </tr>
  )
  }
}


class TableHeader4 extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
    <tr>
    <th>Connection Name</th>
    <th>Is this person related to you?</th>
    <th>To what extent does this person have a different skill set than yours?</th>
    <th>Is this person a different nationality than you?</th>
    <th>How many years of experience does this person have (make a guess)?</th>
    <th>How many countries has this person lived in (make a guess)?</th>
    <th>Check this box if this person attended a different university than you.</th>
    <th>How many degrees does this person have?</th>
    </tr>
    )
    }
}

export { TableHeader1, TableHeader2, TableHeader3, TableHeader4 };
