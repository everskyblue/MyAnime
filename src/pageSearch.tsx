import {
  ActionSheet,
  ActionSheetItem,
  CollectionView,
  Setter,
  Row,
  ImageView,
  TextView,
  SearchAction,
  Listeners
} from 'tabris';

import Lists, {
  getStructData,
  setData
} from './data'

import SearchView from './SearchView'

let data, json;

const apiUrl = 'https://api.jikan.moe/v3/search/anime?q=';

const reSearch = (evt, page) => {
  $(CollectionView).only().dispose();
  receivedData(evt, page)
}

async function receivedData(e, page) {
  data = getStructData();
  if (e.text.length >= 3) {
    try {
      const res = await fetch(apiUrl + encodeURIComponent(e.text));
      json = await res.json();
    
      page.append(
        <CollectionView background="black" padding={10} stretch itemCount={json.results.length} updateCell={updateCell}>
          <Setter target={CollectionView} attribute="createCell">{() =>
            <Row stretchX onTap={addList}>
              <ImageView top={0} width={80} height={120} />
              <TextView textColor="white" stretchX left={5} font="bold 14px serif" />
            </Row>
          }</Setter>
        </CollectionView>
      )
    } catch(e) {
      
    }
  }
}

function updateCell(cell, index) {
  cell.find(ImageView).only().image = json.results[index].image_url;
  cell.find(TextView).only().text = json.results[index].title;
}

async function addList({target}) {
  const actionSheet = ActionSheet.open(
    <ActionSheet title='Acciones'>
      Seleciona una acción
      <ActionSheetItem title='Agregar a mi Lista' />
      <ActionSheetItem title='Cancelar' style='cancel' />
    </ActionSheet>
  );
  
  const {index} = await actionSheet.onClose.promise();
  let pos = target.parent(CollectionView).itemIndex(target);
  
  if (index === 0) {
    data.nombre = json.results[pos].title;
    data.imagen = json.results[pos].image_url;
    setData(data);
  }
}

export default (e, createPage) => {
  const page = createPage("Resultados");
  page.parent().append(<SearchView text={e.text} onAccept={evt => reSearch(evt, page)} />)
  receivedData(e, page);
  
  page.on('disappear', ()=> {
    $(SearchView).first().dispose();
  })
}