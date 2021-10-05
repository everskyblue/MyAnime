"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateView = exports.updateData = exports.removeData = exports.setData = exports.getStructData = void 0;
let listAnime = localStorage.getItem('listAnime');
if (!listAnime) {
    listAnime = localStorage.setItem('listAnime', '[]');
    parseList();
}
else {
    listAnime = JSON.parse(listAnime);
}
function parseList() {
    listAnime = JSON.parse(localStorage.getItem('listAnime'));
}
function getStructData() {
    return {
        nombre: '',
        imagen: '',
        link: '',
        descripcion: '',
        estado: 'pendiente'
    };
}
exports.getStructData = getStructData;
function setData(data) {
    listAnime.push(data);
    localStorage.setItem('listAnime', JSON.stringify(listAnime));
    parseList();
}
exports.setData = setData;
function removeData(index) {
    if (index in listAnime) {
        listAnime.splice(index, 1);
        localStorage.setItem('listAnime', JSON.stringify(listAnime));
        return true;
    }
    return false;
}
exports.removeData = removeData;
function updateData(index, data) {
    listAnime[index] = data;
    localStorage.setItem('listAnime', JSON.stringify(listAnime));
}
exports.updateData = updateData;
exports.stateView = ['pendiente', 'visto'];
exports.default = () => listAnime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVlBLElBQUksU0FBUyxHQUFTLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFeEQsSUFBSSxDQUFDLFNBQVMsRUFBRTtJQUNkLFNBQVMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRCxTQUFTLEVBQUUsQ0FBQztDQUNiO0tBQU07SUFDTCxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUNuQztBQUdELFNBQVMsU0FBUztJQUNoQixTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUVELFNBQWdCLGFBQWE7SUFDM0IsT0FBTztRQUNMLE1BQU0sRUFBRSxFQUFFO1FBQ1YsTUFBTSxFQUFFLEVBQUU7UUFDVixJQUFJLEVBQUUsRUFBRTtRQUNSLFdBQVcsRUFBRSxFQUFFO1FBQ2YsTUFBTSxFQUFFLFdBQVc7S0FDcEIsQ0FBQTtBQUNILENBQUM7QUFSRCxzQ0FRQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxJQUFXO0lBQ2pDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzdELFNBQVMsRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQUpELDBCQUlDO0FBRUQsU0FBZ0IsVUFBVSxDQUFDLEtBQWE7SUFDdEMsSUFBSSxLQUFLLElBQUksU0FBUyxFQUFFO1FBQ3RCLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM3RCxPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBUEQsZ0NBT0M7QUFFRCxTQUFnQixVQUFVLENBQUMsS0FBYSxFQUFFLElBQUk7SUFDNUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN4QixZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUhELGdDQUdDO0FBRVksUUFBQSxTQUFTLEdBQWEsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFMUQsa0JBQWUsR0FBRSxFQUFFLENBQUMsU0FBUyxDQUFDIn0=