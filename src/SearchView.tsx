import {SearchAction} from 'tabris'

export default function SearchView(attributes) {
  return (
    <SearchAction message="minimo 3 caracteres a buscar" title="buscar" {...attributes} />
  )
}