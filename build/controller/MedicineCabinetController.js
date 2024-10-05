"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineCabinet = void 0;
const Medicament_1 = require("../models/Medicament");
const readline = __importStar(require("readline"));
class MedicineCabinet {
    constructor() {
        this.medicaments = [];
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    addMedicament() {
        this.rl.question('Nombre del medicamento: ', (name) => {
            this.rl.question('Cantidad: ', (stock) => {
                this.rl.question('Fecha de caducidad (DD/MM/AA): ', (caducity) => {
                    this.rl.question('Descripción: ', (description) => {
                        const newMedicamnet = new Medicament_1.Medicament(name, parseInt(stock, 10), caducity, description);
                        this.medicaments.push(newMedicamnet);
                        console.log(`Medicamento ${newMedicamnet.name} registrado con exito`);
                        this.showMenu();
                    });
                });
            });
        });
    }
    ;
    showMedicaments() {
        if (this.medicaments.length > 0) {
            this.medicaments.forEach(medicament => {
                console.log(`
                nombre del medicamento : ${medicament.name}\n
                cantidad disponible: ${medicament.stock}\n
                fecha de caducidad: ${medicament.caducity}\n
                descripcion: ${medicament.description}
                `);
            });
        }
        else if (this.medicaments.length === 0) {
            console.log('No hay medicamnetos en stock');
        }
        this.showMenu();
    }
    searchMedicament(name) {
        let existMedicament = this.medicaments.find(medicament => medicament.name === name);
        if (existMedicament !== undefined) {
            console.log(`
                nombre del medicamento : ${existMedicament.name}\n
                cantidad disponible: ${existMedicament.stock}\n
                fecha de caducidad: ${existMedicament.caducity}\n
                descripcion: ${existMedicament.description}
            `);
        }
        else {
            console.log('El medicamento no se ha encontrado...');
        }
        this.showMenu();
    }
    updateMedicament(nameMedicament) {
        let existMedicament = this.medicaments.find(medicament => medicament.name === nameMedicament);
        if (existMedicament !== undefined) {
            console.log('Actualizar medicamento');
            this.rl.question(`Nombre del medicamento : `, (name) => {
                this.rl.question(`cantidad del medicamento : `, (stock) => {
                    this.rl.question(`Fecha de caducidad : `, (caducity) => {
                        this.rl.question('Descripción: ', (description) => {
                            existMedicament.name = name || existMedicament.name;
                            existMedicament.stock = stock ? parseInt(stock, 10) : existMedicament.stock;
                            existMedicament.caducity = caducity || existMedicament.caducity;
                            existMedicament.description = description || existMedicament.description;
                            this.showMenu();
                        });
                    });
                });
            });
        }
        else {
            console.log('el medicamento no se ha encontrado');
            this.showMenu();
        }
    }
    deleteMedicament(nameMedicament) {
        let index = this.medicaments.findIndex(medicament => medicament.name == nameMedicament);
        if (index !== -1) {
            const [deleteMedicament] = this.medicaments.splice(index, 1);
            console.log(`Medicamento ${deleteMedicament.name} eliminado con exito`);
        }
        else {
            console.log('El medicamento no se ha encontrado');
        }
        this.showMenu();
    }
    getMedicament(nameMedicament, quantity) {
        let index = this.medicaments.findIndex(medicament => medicament.name == nameMedicament);
        console.log(this.medicaments[index]);
        if (index !== -1) {
            if (this.medicaments[index].stock === 0) {
                console.log('No hay stock del medicamento solicitado.');
            }
            else if (this.medicaments[index].stock < quantity) {
                console.log('La cantidad que ha solicitado es mayor al stock del medicamento solicitado');
            }
            else if (this.medicaments[index].stock > quantity) {
                this.medicaments[index].stock -= quantity;
                console.log(`Se ha hecho la requisicion del medicamento ${this.medicaments[index].name} en ${quantity} unidades.`);
            }
        }
        this.showMenu();
    }
    showMenu() {
        this.rl.question('===========================\n' +
            'BOTIQUIN DEL HOSPITAL\n' +
            '===========================\n' +
            '1. Agregar el medicamento\n' +
            '2. Mostrar el medicamento\n' +
            '3. Buscar el medicamento\n' +
            '4. Actualizar medicamento\n' +
            '5. Eliminar medicamento\n' +
            '6. Crear la requisicion\n' +
            '7. Salir\n' +
            '============================\n', (option) => {
            this.options(parseInt(option));
        });
    }
    options(option) {
        switch (option) {
            case 1:
                this.addMedicament();
                break;
            case 2:
                this.showMedicaments();
                break;
            case 3:
                this.rl.question('Nombre del medicamento: ', (name) => {
                    this.searchMedicament(name);
                });
                break;
            case 4:
                this.rl.question('Nombre del medicamento a actualizar: ', (name) => {
                    this.updateMedicament(name);
                });
                break;
            case 5:
                this.rl.question('Nombre del medicamento a eliminar: ', (name) => {
                    this.deleteMedicament(name);
                });
                break;
            case 6:
                this.rl.question('Nombre de la medicina: ', (name) => {
                    this.rl.question('Cantidad de la medicina: ', (quantity) => {
                        this.getMedicament(name, parseInt(quantity));
                    });
                });
                break;
            case 7:
                console.log('Saliendo del programa...');
                this.rl.close();
                break;
            default:
                break;
        }
    }
}
exports.MedicineCabinet = MedicineCabinet;
