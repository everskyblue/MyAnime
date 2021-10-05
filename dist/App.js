"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const tabris_1 = require("tabris");
const parseUri_1 = require("./parseUri");
const data_1 = require("./data");
const pageSearch_1 = require("./pageSearch");
const SearchView_1 = require("./SearchView");
let nav = $(tabris_1.NavigationView).first();
function createPage(title, content) {
    const actions = $(tabris_1.Action);
    const search = $(SearchView_1.default).first();
    actions.detach();
    search.detach();
    nav.append(JSX.createElement(tabris_1.Page, { title: title }, content || JSX.createElement(tabris_1.WidgetCollection, null)));
    nav.pages().last().on('disappear', () => {
        nav.append(actions);
        nav.append(search);
    });
    return nav.pages().last();
}
class App {
    start() {
        let total;
        tabris_1.contentView.append((JSX.createElement(tabris_1.NavigationView, { stretch: true },
            JSX.createElement(tabris_1.WidgetCollection, null,
                JSX.createElement(tabris_1.Action, { title: "a\u00F1adir", onSelect: () => createPage("Añadir Anime", this.pageAddData()) }),
                JSX.createElement(SearchView_1.default, { onAccept: (e) => (0, pageSearch_1.default)(e, createPage) })),
            JSX.createElement(tabris_1.Page, { padding: "5", stretch: true, title: "MyAnime" },
                JSX.createElement(tabris_1.RefreshComposite, { stretch: true, onRefresh: this.updateComposite.bind(this) },
                    JSX.createElement(tabris_1.ScrollView, { stretch: true, direction: "vertical", layout: new tabris_1.StackLayout({ layoutData: 'stretch', spacing: 10 }) }, this.getData()))))));
        nav = $(tabris_1.NavigationView).first();
        nav.toolbarColor = "rgb(0,0,0)";
        tabris_1.navigationBar.theme = "dark";
        tabris_1.navigationBar.background = "rgb(0,0,0)";
    }
    pageAddData(data) {
        this.data = data || (0, data_1.getStructData)();
        return (JSX.createElement(tabris_1.Stack, { stretch: true, padding: 10, spacing: 25 },
            JSX.createElement(tabris_1.TextInput, { text: this.data.nombre, onInput: ({ text }) => (this.data.nombre = text), stretchX: true, message: "nombre", type: "default" }),
            JSX.createElement(tabris_1.TextInput, { text: this.data.link, onInput: ({ text }) => (this.data.link = text), stretchX: true, message: "link", keyboard: "url" }),
            JSX.createElement(tabris_1.Picker, Object.assign({ stretchX: true, message: "Estado", onSelect: ({ index }) => (this.data.estado = data_1.stateView[index]), itemCount: data_1.stateView.length, itemText: index => data_1.stateView[index] }, selection())),
            JSX.createElement(tabris_1.Button, { right: true, text: data ? "actualizar" : "añadir", onTap: data ? () => ((0, data_1.updateData)(data.idx, this.data) & this.updateData()) : this.addCard.bind(this) })));
        function selection() {
            return data ? {
                selectionIndex: data_1.stateView.indexOf(data.estado)
            } : {};
        }
    }
    updateData() {
        nav.pages().last().dispose();
        nav.find(tabris_1.RefreshComposite).first().trigger('refresh');
        this.data = null;
    }
    addCard() {
        if (this.data && (!this.data.nombre.length && !this.data.estado.length)) {
            AlertDialog.open('campo de nombre y estado son requeridos');
        }
        else {
            (0, data_1.setData)(this.data);
            nav.pages().last().dispose();
            nav.find(tabris_1.RefreshComposite).first().trigger('refresh');
            this.data = null;
        }
    }
    openActionSheet({ target }, i) {
        return __awaiter(this, void 0, void 0, function* () {
            const actionSheet = tabris_1.ActionSheet.open(JSX.createElement(tabris_1.ActionSheet, null,
                JSX.createElement(tabris_1.ActionSheetItem, { title: 'Editar' }),
                JSX.createElement(tabris_1.ActionSheetItem, { title: 'Eliminar', style: "destructive" }),
                JSX.createElement(tabris_1.ActionSheetItem, { title: 'Cancelar', style: 'cancel' })));
            const { index } = yield actionSheet.onClose.promise();
            const lists = (0, data_1.default)();
            switch (index) {
                case 0:
                    createPage("Editar Lista", this.pageAddData(Object.assign({ idx: i }, lists[i])));
                    break;
                case 1:
                    target.dispose();
                    (0, data_1.removeData)(i);
                    break;
            }
        });
    }
    updateComposite(e) {
        const sc = $(tabris_1.ScrollView).first();
        sc.children().dispose();
        sc.append(this.getData());
        e.target.refreshIndicator = false;
    }
    getData() {
        return (0, data_1.default)().map((item, idx) => (JSX.createElement(tabris_1.Composite, { padding: 10, cornerRadius: 10, background: "black", stretchX: true, onTap: e => this.openActionSheet(e, idx), layout: new tabris_1.RowLayout({ alignment: 'baseline' }) },
            item.imagen ? JSX.createElement(tabris_1.ImageView, { image: item.imagen, width: 80, height: 120 }) : JSX.createElement(tabris_1.WidgetCollection, null),
            JSX.createElement(tabris_1.Stack, { stretchX: true, spacing: 10, padding: 10 },
                JSX.createElement(tabris_1.Row, { stretchX: true },
                    JSX.createElement(tabris_1.TextView, { stretchX: true, font: "bold 20px", text: item.nombre, textColor: "white" }),
                    JSX.createElement(tabris_1.TextView, { centerY: true, text: item.estado, textColor: "green" })),
                JSX.createElement(tabris_1.TextView, { markupEnabled: true, stretchX: true, onTapLink: e => tabris_1.app.launch(e.url) },
                    JSX.createElement("span", { textColor: "white" }, "ver en:"),
                    " ",
                    JSX.createElement("a", { href: item.link }, (0, parseUri_1.default)(item.link).host))))));
    }
    get total() {
        return nav.pages().length == 1;
    }
}
exports.App = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0FwcC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbUNBMkJnQjtBQUNoQix5Q0FBaUM7QUFDakMsaUNBQThGO0FBQzlGLDZDQUFxQztBQUNyQyw2Q0FBcUM7QUFFckMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLHVCQUFjLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUVwQyxTQUFTLFVBQVUsQ0FBQyxLQUFhLEVBQUUsT0FBTztJQUN4QyxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsZUFBTSxDQUFDLENBQUM7SUFDMUIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLG9CQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVyQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDakIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQ1Isa0JBQUMsYUFBSSxJQUFDLEtBQUssRUFBRSxLQUFLLElBQ2YsT0FBTyxJQUFJLGtCQUFDLHlCQUFnQixPQUFHLENBQzNCLENBQ1IsQ0FBQTtJQUNELEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUUsRUFBRTtRQUNyQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ25CLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDcEIsQ0FBQyxDQUFDLENBQUE7SUFFRixPQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBRUQsTUFBYSxHQUFHO0lBR1AsS0FBSztRQUNWLElBQUksS0FBYSxDQUFDO1FBQ2xCLG9CQUFXLENBQUMsTUFBTSxDQUFDLENBQ2pCLGtCQUFDLHVCQUFjLElBQUMsT0FBTztZQUNuQixrQkFBQyx5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