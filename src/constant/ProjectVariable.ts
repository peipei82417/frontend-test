/**
 * 此腳本為專案全局唯一常數
 * 可在此進行專案初始化數據
 * 以及專案featured相關算法
 */
export default class ProjectVariable {
    static readonly version = "0.1.0";
    static readonly lastUpdate = "2022/06/26";

    static readonly stateFilterOptions = ["Georgia", "Wyoming", "Montana"];
    static readonly stateFilterDefaultValue = ["Georgia"];

    static readonly groupCheckboxOptions = ["State", "City", "Type"];
    static readonly groupCheckboxDefaultValue = ["State", "City"];

    static getTableColsByFields = (fields: string[]) => {
        const colums = [
            {
                title: "Houses",
                dataIndex: "houses",
                key: "houses",
                sorter: (a: any, b: any) => a["houses"] - b["houses"],
                ellipsis: true,
            },
            {
                title: "Avg. Price",
                dataIndex: "avg. price",
                key: "avg. price",
                sorter: (a: any, b: any) => a["avg. price"] - b["avg. price"],
                ellipsis: true,
            },
        ];
        let idx = fields.length - 1;
        while (idx >= 0) {
            const key = fields[idx].toLocaleLowerCase();
            const data: any = {
                title: fields[idx],
                dataIndex: key,
                key: key,
                sorter: (a: any, b: any) => a[key].charCodeAt(0) - b[key].charCodeAt(0),
                ellipsis: true,
            }
            colums.unshift(data);
            idx--;
        }
        return colums;
    }

    static groupByFields = (data: any[], fields: string[]): any[][] => {
        fields = fields.map(field => field.toLocaleLowerCase());
        const groups = [], len = data.length;
        for (let i = 0; i < len; i++) {
            const obj = data[i];
            if (groups.length === 0) {
                groups.push([obj]);
            } else {
                let equalGroup: boolean | any[] = false;
                for (let j = 0, glen = groups.length; j < glen; j++) {
                    const group = groups[j];
                    let equal = true;
                    const firstElement = group[0];
                    fields.forEach((field) => {
                        if (firstElement[field] !== obj[field]) {
                            equal = false;
                        }
                    });
                    if (equal) {
                        equalGroup = group;
                    }
                }
                if (equalGroup) {
                    equalGroup.push(obj);
                } else {
                    groups.push([obj]);
                }
            }
        }
        return groups;
    }

    static groupByFields2 = (data: any[], fields: string[]): Map<string, any[]> => {
        fields = fields.map(field => field.toLocaleLowerCase());
        const groups = new Map(), len = data.length;
        for (let i = 0; i < len; i++) {
            const temp: any[] = [];
            fields.forEach((field) => {
                temp.push(data[i][field]);
            });
            const str = JSON.stringify(temp);
            const existGroup = groups.get(str);
            if (existGroup) {
                groups.set(str, [...existGroup, data[i]]);
            } else {
                groups.set(str, [data[i]]);
            }
        }
        return groups;
    };

    static getTableRowByCols = (groups: any, fields: any) => {
        const cols: string[] = fields.map((field: any) => field['key']);
        const getAvg = (arr: any[], len: number) => {
            let totle = 0;
            arr.forEach((i: any) => totle += i.price);
            return Math.round((totle / len) * 100) / 100;
        }
        const rows: any[] = [];
        for (let i = 0; i < groups.length; i++) {
            const avgPrice = getAvg(groups[i], groups[i].length);
            const data: any = {
                id: i,
                houses: groups[i].length,
                "avg. price": avgPrice
            }
            for (let j = 0; j < cols.length; j++) {
                if (cols[j] in data) {
                    continue;
                }
                const key = cols[j];
                data[key] = groups[i][0][key];
            }
            rows.push(data);
        }
        return rows;
    }

    static getTableRowByCols2 = (groups: Map<string, any[]>, fields: any): any[] => {
        const cols: string[] = fields.map((field: any) => field['key']);
        const getAvg = (arr: any[], len: number) => {
            let totle: number = 0;
            arr.forEach((i: any) => totle += i.price);
            return Math.round((totle / len) * 100) / 100;
        };
        const rows: any[] = [];
        let iter = groups.entries();
        for (let i = 0; i < groups.size; i++) {
            const [k, v] = iter.next().value;
            const keys = JSON.parse(k);
            const avgPrice = getAvg(v, v.length);
            const data: any = {
                id: i,
                houses: v.length,
                "avg. price": avgPrice
            };
            for (let j = cols.length - 1; j >= 0; j--) {
                if (cols[j] in data) {
                    continue;
                }
                data[cols[j]] = keys.pop();
            }
            rows.push(data);
        }
        groups.clear();
        return rows;
    };
}