import { Transform } from "node:stream";
import XLSX from "xlsx";

const MAP = {
  "Nome do Responsável": "name",
  "Nome do Aluno": "student",
  Turma: "class",
  Celular: "phone",
  CPF: "cpf",
  "Valor Mensalidade (R$)": "amount",
};

export class XLSXToJSONTransform extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      const workbook = XLSX.read(chunk, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      this.push(JSON.stringify(json, null, 2));

      callback();
    } catch (error) {
      this.emit("error", error);
    }
  }
}

export class JSONMapPropsTransform extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      const json = JSON.parse(chunk ?? "[]");

      for (const item of json) {
        const _object = Object.entries(MAP).reduce((acc, [key, value]) => {
          if (item[key]) {
            let processedValue = item[key];
            if (value === "cpf" || value === "phone") {
              processedValue = processedValue.replace(/\D/g, "");
            }
            // if (value === "class") {
            //   const _class = processedValue.split(" ");
            //   processedValue = _class[0].concat(" ").concat(_class[1]);
            // }
            acc[value] = processedValue;
          }
          return acc;
        }, {});

        this.push(JSON.stringify(_object, null, 2));
      }

      callback();
    } catch (error) {
      this.emit("error", error);
    }
  }
}
