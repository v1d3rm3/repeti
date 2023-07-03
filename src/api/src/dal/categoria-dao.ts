import { Injectable } from '@nestjs/common';
import * as dot from 'dot-object';
import { PrismaService } from '../core/prisma.service';
import { ICategoriaDao } from './i-categoria-dao';

@Injectable()
export class CategoriaDao implements ICategoriaDao {
  constructor(private readonly prismaService: PrismaService) {}

  async recuperarPorNome(nome: string) {
    // const cleanObject = function (object) {
    //   Object.entries(object).forEach(([k, v]) => {
    //     if (v && typeof v === 'object') cleanObject(v);
    //     if (
    //       (v && typeof v === 'object' && !Object.keys(v).length) ||
    //       v === null ||
    //       v === undefined ||
    //       (v as []).length === 0
    //     ) {
    //       if (Array.isArray(object)) object.splice(k, 1);
    //       else if (!(v instanceof Date)) delete object[k];
    //     }
    //   });
    //   return object;
    // };

    function clean(obj) {
      for (const k in obj) {
        const prop = obj[k];
        if (prop === null || prop === undefined || prop === '') {
          delete obj[k];
        }
      }
      // for (const propName in obj) {
      //   console.log(propName);

      //   if (
      //     obj[propName] &&
      //     typeof obj[propName] === 'object' &&
      //     Object.keys(obj[propName])?.length === 0
      //   )
      //     console.log('go');

      //   if (
      //     obj[propName] === null ||
      //     obj[propName] === undefined ||
      //     obj[propName] === '' ||
      //     (typeof obj[propName] === 'object' &&
      //       Object.keys(obj[propName]).length === 0)
      //   ) {
      //     console.log('sla =-===');
      //     delete obj[propName];
      //   } else if (typeof obj[propName] === 'object') {
      //     // Recurse here if the property is another object.
      //     console.log('CLEAN =-===');

      //     clean(obj[propName]);
      //   }
      // }
      // return obj;
    }

    const res: object[] = await this.prismaService.$queryRaw`
      select 
        c1.id 'id',  
        c1.nome 'nome', 
        c2.id 'pai.id',
        c2.nome 'pai.nome'
      from categoria c1
      left join categoria c2
      on c2.categoria_pai_id = c1.id
    `;

    res.forEach((element) => dot.object(element));
    // res.forEach((e) => clean(e));
    for (const prop of res) {
      for (const k in prop) {
        // const prop = prop[k];
        if (prop[k] === null || prop[k] === undefined || prop[k] === '') {
          delete prop[k];
        }
      }
    }

    // delete res[0]['pai'];

    return res;
  }
}
