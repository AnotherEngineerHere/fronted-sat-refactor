import React from 'react'

export default function Checkbox( props ) {
  const handleCheckbox = (event) => {
    
    
    props.selected(event.target.value);
    
    
  }
  return (
    <ul>
      {props.involvedP.map((item, index) => (
        <><span>{item['nameInvolved']}</span><input checked={item.check} onChange={handleCheckbox} type="checkbox" value={item.nameInvolved} /></>
      ))}

    </ul>
  );
}
