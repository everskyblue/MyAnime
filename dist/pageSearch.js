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
const tabris_1 = require("tabris");
const data_1 = require("./data");
const SearchView_1 = require("./SearchView");
let data, json;
const apiUrl = 'https://api.jikan.moe/v3/search/anime?q=';
const reSearch = (evt, page) => {
    $(tabris_1.CollectionView).only().dispose();
    receivedData(evt, page);
};
function receivedData(e, page) {
    return __awaiter(this, void 0, void 0, function* () {
        data = (0, data_1.getStructData)();
        if (e.text.length >= 3) {
            try {
                const res = yield fetch(apiUrl + encodeURIComponent(e.text));
                json = yield res.json();
                page.append(JSX.createElement(tabris_1.CollectionView, { background: "black", padding: 10, stretch: true, itemCount: json.results.length, updateCell: updateCell },
                    JSX.createElement(tabris_1.Setter, { target: tabris_1.CollectionView, attribute: "createCell" }, () => JSX.createElement(tabris_1.Row, { stretchX: true, onTap: addList },
                        JSX.createElement(tabris_1.ImageView, { top: 0, width: 80, height: 120 }),
                        JSX.createElement(tabris_1.TextView, { textColor: "white", stretchX: true, left: 5, font: "bold 14px serif" })))));
            }
            catch (e) {
            }
        }
    });
}
function updateCell(cell, index) {
    cell.find(tabris_1.ImageView).only().image = json.results[index].image_url;
    cell.find(tabris_1.TextView).only().text = json.results[index].title;
}
function addList({ target }) {
    return __awaiter(this, void 0, void 0, function* () {
        const actionSheet = tabris_1.ActionSheet.open(JSX.createElement(tabris_1.ActionSheet, { title: 'Acciones' },
            "Seleciona una acci\u00F3n",
            JSX.createElement(tabris_1.ActionSheetItem, { title: 'Agregar a mi Lista' }),
            JSX.createElement(tabris_1.ActionSheetItem, { title: 'Cancelar', style: 'cancel' })));
        const { index } = yield actionSheet.onClose.promise();
        let pos = target.parent(tabris_1.CollectionView).itemIndex(target);
        if (index === 0) {
            data.nombre = json.results[pos].title;
            data.imagen = json.results[pos].image_url;
            (0, data_1.setData)(data);
        }
    });
}
exports.default = (e, createPage) => {
    const page = createPage("Resultados");
    page.parent().append(JSX.createElement(SearchView_1.default, { text: e.text, onAccept: evt => reSearch(evt, page) }));
    receivedData(e, page);
    page.on('disappear', () => {
        $(SearchView_1.default).first().dispose();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZVNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wYWdlU2VhcmNoLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG1DQVVnQjtBQUVoQixpQ0FHZTtBQUVmLDZDQUFxQztBQUVyQyxJQUFJLElBQUksRUFBRSxJQUFJLENBQUM7QUFFZixNQUFNLE1BQU0sR0FBRywwQ0FBMEMsQ0FBQztBQUUxRCxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUM3QixDQUFDLENBQUMsdUJBQWMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25DLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDekIsQ0FBQyxDQUFBO0FBRUQsU0FBZSxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUk7O1FBQ2pDLElBQUksR0FBRyxJQUFBLG9CQUFhLEdBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUN0QixJQUFJO2dCQUNGLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUV4QixJQUFJLENBQUMsTUFBTSxDQUNULGtCQUFDLHVCQUFjLElBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLE9BQU8sUUFBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFVBQVU7b0JBQzVHLGtCQUFDLGVBQU0sSUFBQyxNQUFNLEVBQUUsdUJBQWMsRUFBRSxTQUFTLEVBQUMsWUFBWSxJQUFFLEdBQUcsRUFBRSxDQUMzRCxrQkFBQyxZQUFH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