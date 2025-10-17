import { css } from 'lit'

export const styles = css`
  :host {
    display: flex;
    position: relative;
    box-sizing: border-box;
    flex-wrap: nowrap;
    flex-direction: row; /* default */
    justify-content: center; /* default */
    align-items: center; /* default */
    gap: var(--gap, 0);
  }

  /* wrap */
  :host([wrap]) { flex-wrap: wrap; }

  /* direction */
  :host([direction="row"]) { flex-direction: row; }
  :host([direction="row-reverse"]) { flex-direction: row-reverse; }
  :host([direction="column"]) { flex-direction: column; }
  :host([direction="column-reverse"]) { flex-direction: column-reverse; }

  /* justify-content */
  :host([justify="flex-start"]) { justify-content: flex-start; }
  :host([justify="center"]) { justify-content: center; }
  :host([justify="flex-end"]) { justify-content: flex-end; }
  :host([justify="space-between"]) { justify-content: space-between; }
  :host([justify="space-around"]) { justify-content: space-around; }
  :host([justify="space-evenly"]) { justify-content: space-evenly; }

  /* align-items */
  :host([align="stretch"]) { align-items: stretch; }
  :host([align="flex-start"]) { align-items: flex-start; }
  :host([align="center"]) { align-items: center; }
  :host([align="flex-end"]) { align-items: flex-end; }
  :host([align="baseline"]) { align-items: baseline; }

  /* fit: fill parent */
  :host([fit]) {
    position: absolute;
    top:0px;
    left:0px;
    width: 100%;
    height: 100%;
  }

  /* When auto-flex is used as flex item */
  :host([grow]) { flex-grow: var(--flex-grow, 0); }
  :host([shrink]) { flex-shrink: var(--flex-shrink, 1); }

  :host([equal]) { align-items: stretch; }

  /* border: 1 => host border */
  :host([border="1"]) {
    border: 1px solid var(--border-color, #dcdfe6); 
  }

  /* border: 2 => child grid borders without double lines */
  :host([border="2"]) { 
    gap:0; 
    border: 1px solid red; 
    padding: 0px !important;;
  }  
  :host([border="2"]) ::slotted(*) {
    box-sizing: border-box; 
    border-right:  1px solid red;; 
    border-radius: 0px !important;
    &>:first-child {
      border-top:none !important;
      border-left:none !important;
    }
    &:last-child {
      border-bottom-right-radius: 4px;
    }
  }
`
