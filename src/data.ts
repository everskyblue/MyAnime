type State = 'pendiente' | 'visto';

interface Store {
  nombre: string
  imagen?: string
  link?: string
  estado: State
  descripcion?: string
}

type List = string | Store[];

let listAnime: List = localStorage.getItem('listAnime');

if (!listAnime) {
  listAnime = localStorage.setItem('listAnime', '[]');
  parseList();
} else {
  listAnime = JSON.parse(listAnime);
}


function parseList() {
  listAnime = JSON.parse(localStorage.getItem('listAnime'));
}

export function getStructData(): Store {
  return {
    nombre: '',
    imagen: '',
    link: '',
    descripcion: '',
    estado: 'pendiente'
  }
}

export function setData(data: Store) {
  listAnime.push(data);
  localStorage.setItem('listAnime', JSON.stringify(listAnime));
  parseList();
}

export function removeData(index: number): boolean {
  if (index in listAnime) {
    listAnime.splice(index,1);
    localStorage.setItem('listAnime', JSON.stringify(listAnime));
    return true;
  }
  return false;
}

export function updateData(index: number, data) {
  listAnime[index] = data;
  localStorage.setItem('listAnime', JSON.stringify(listAnime));
}

export const stateView: string[] = ['pendiente', 'visto'];

export default ()=> listAnime;