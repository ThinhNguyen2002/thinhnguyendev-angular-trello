//select all input value when click
export const selectAllInlineText = (e:any) => {
    e.target.focus()
    e.target.select()
    // document.execCommand('selectAll', false, null)
}

//onKeyDown
export const saveContentAfterPressEnter = (e:any) => {
    if (e.key === 'Enter') { 
        e.preventDefault()
        e.target.blur()
    }
}
