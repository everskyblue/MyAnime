import {
  app,
  navigationBar,
  ImageView,
  TextView,
  contentView,
  Constraint,
  NavigationView,
  WidgetCollection,
  Action,
  SearchAction,
  Page,
  RefreshComposite,
  Composite,
  ScrollView,
  StackLayout,
  RowLayout,
  Row,
  
  Stack,
  StackLayout,
  TextInput,
  Button,
  Picker,
  
  ActionSheet,
  ActionSheetItem
} from 'tabris';
import parseUri from './parseUri'
import Lists, {getStructData, updateData, Store, removeData, setData, stateView} from './data'
import pageSearch from './pageSearch'
import SearchView from './SearchView'

let nav = $(NavigationView).first();

function createPage(title: string, content): Page {
  const actions = $(Action);
  const search = $(SearchView).first();
  
  actions.detach();
  search.detach();
  nav.append(
    <Page title={title}>
      {content || <WidgetCollection />}
    </Page>
  )
  nav.pages().last().on('disappear', ()=> {
    nav.append(actions)
    nav.append(search)
  })
  
  return nav.pages().last();
}

export class App {
  private data;
  
  public start() {
    let total: number;
    contentView.append((
      <NavigationView stretch>
          <WidgetCollection> 
            <Action title="añadir" onSelect={()=> createPage("Añadir Anime", this.pageAddData())} />
            <SearchView onAccept={(e)=>pageSearch(e, createPage)} />
          </WidgetCollection>
          <Page padding="5" stretch title="MyAnime">
            <RefreshComposite stretch onRefresh={this.updateComposite.bind(this)}>
              <ScrollView stretch direction="vertical" layout={new StackLayout({layoutData: 'stretch', spacing:10})}>
                {...this.getData()}
              </ScrollView>
            </RefreshComposite>
          </Page>
      </NavigationView>
    ));
    
    nav = $(NavigationView).first();
    nav.toolbarColor = "rgb(0,0,0)";
    navigationBar.theme="dark";
    navigationBar.background="rgb(0,0,0)";
  }
  
  pageAddData(data) {
    this.data = data || getStructData();
  
    return (
      <Stack stretch padding={10} spacing={25}>
        <TextInput text={this.data.nombre} onInput={({text}) => (this.data.nombre = text)} stretchX message="nombre" type="default" />
        <TextInput text={this.data.link} onInput={({text}) => (this.data.link = text)} stretchX message="link" keyboard="url" />
        <Picker 
          stretchX
          message="Estado"
          onSelect={({index}) => (this.data.estado = stateView[index])}
          itemCount={stateView.length}
          itemText={index => stateView[index]}
          {...selection()}
        />
        <Button right text={data ? "actualizar" : "añadir"} onTap={data ? ()=> (updateData(data.idx, this.data) & this.updateData()) : this.addCard.bind(this)} />
      </Stack>
    )
    
    function selection():object {
      return data ? {
        selectionIndex: stateView.indexOf(data.estado)
      } : {};
    }
  }
  
  updateData() {
    nav.pages().last().dispose();
    nav.find(RefreshComposite).first().trigger('refresh');
    this.data = null;
  }
  
  addCard() {
    if (this.data && (!this.data.nombre.length && !this.data.estado.length)) {
      AlertDialog.open('campo de nombre y estado son requeridos')
    } else {
      setData(this.data);
      nav.pages().last().dispose();
      nav.find(RefreshComposite).first().trigger('refresh');
      this.data = null;
    }
  }
  
  async openActionSheet({target}, i) {
    const actionSheet = ActionSheet.open(
      <ActionSheet>
        <ActionSheetItem title='Editar' />
        <ActionSheetItem title='Eliminar' style="destructive" />
        <ActionSheetItem title='Cancelar' style='cancel' />
      </ActionSheet>
    );
    
    const {index} = await actionSheet.onClose.promise();
    const lists = Lists();
    switch (index) {
      case 0:
        createPage("Editar Lista", this.pageAddData({idx: i, ...lists[i]}));
        break;
      case 1:
        target.dispose();
        removeData(i);
        break;
    }
  }
  
  private updateComposite(e) {
    const sc = $(ScrollView).first();
    sc.children().dispose();
    sc.append(this.getData())
    e.target.refreshIndicator = false;
  }
  
  private getData() {
    return Lists().map((item, idx) => (
      <Composite
        padding={10}
        cornerRadius={10}
        background="black"
        stretchX
        onTap={e => this.openActionSheet(e, idx)}
        layout={new RowLayout({alignment: 'baseline'})}
      >
        {
          item.imagen ? <ImageView image={item.imagen} width={80} height={120} /> : <WidgetCollection />
        }
        <Stack stretchX
          spacing={10}
          padding={10}
        > 
          <Row stretchX>
            <TextView stretchX font="bold 20px" text={item.nombre} textColor="white" />
            <TextView centerY text={item.estado} textColor="green" />
          </Row>
          <TextView markupEnabled stretchX onTapLink={e => app.launch(e.url)}>
            <span textColor="white">ver en:</span> <a href={item.link}>{parseUri(item.link).host}</a>
          </TextView>
        </Stack>
      </Composite>
    ))
  }
  
  private get total (){
    return nav.pages().length==1;
  }
}