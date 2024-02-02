import React from 'react'

interface Props {  //interfejs koji definiše koji propertiji mogu biti prosleđeni komponenti. 
    center?: boolean,  //? znak pitanja opcion 
    size?: 'h1' | 'h2' | 'h3' | 'h4',  //velicina header-a
    className?: string,
    error?: boolean  //da li imamo error, Ako je postavljen na true, dodaje se klasa za prikazivanje teksta u crvenoj boji. unauthorized  pise stvarno 
    content: string  //tekst koji se prikazuje unutar header-a
}

export default function Header(props: Props) {  //props su kao osobine, atributi 
    const Element = props.size || 'h1';  // Element je promenljiva koja dinamički postavlja vrednost na osnovu propertija size. 
    //Ako size nije definisano, koristi se podrazumevana vrednost 'h1
    //p-2 je padding 
    const className = 'p-2 ' + (props.center ? 'text-center ' : '') + (props.className || '') + (props.error ? ' text-danger' : '')
    //text-danger nam dodaje crvenu boju zapravo

    //props.contnent postavlja sadrzaj koji ce biti prikazan 
    return (
        <Element className={className}>
            {props.content}  
        </Element>
    )
}
