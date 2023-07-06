import * as dot from 'dot-object';

export class ResultQuery<T> {
  constructor(private res: T[] | T) {}

  static create<J>(res: J[] | J) {
    return new ResultQuery(res);
  }

  /**
   * Transforma o objeto de dotnotation
   * para objeto, e limpa todos os campos
   * nulos, undefined ou vazios.
   */
  normalizeResult() {
    if (Array.isArray(this.res)) return this.normalizeManyResult(this.res);
    else if (this.res) return this.normalizeOneResult(this.res);
    else return this.res;
  }

  private normalizeManyResult(res: T[]) {
    res.map((element) => dot.object(element as unknown as object));
    res.forEach((el) => this.clean(el));
    return res;
  }

  private normalizeOneResult(res: T) {
    dot.object(res as unknown as object);
    this.clean(res);
    return res;
  }

  private clean(obj: { [k: string]: any }) {
    for (const k in obj) {
      if (
        obj[k] === undefined ||
        obj[k] === null ||
        (obj[k] &&
          typeof obj[k] === 'object' &&
          Object.keys(obj[k]).length === 0)
      ) {
        delete obj[k];
      } else if (obj[k] && typeof obj[k] === 'object') {
        this.clean(obj[k]);
        if (
          obj[k] &&
          typeof obj[k] === 'object' &&
          Object.keys(obj[k]).length === 0
        )
          delete obj[k];
      }
    }
  }
}
