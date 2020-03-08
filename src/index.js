'use strict';

class MemorySqrlStore {
  constructor(options) {
    const opts = options || {};
    this.nuts = opts.nuts || {};
    this.sqrl = opts.sqrl || {};
    this.users = opts.users || {};
  }

  async createNut(it) {
    // TODO: verify write
    const newNut = {
      id: Object.keys(this.nuts).length + 1,
      initial: it.initial,
      hmac: it.hmac,
      ip: it.ip,
      user_id: it.user_id,
      ask: it.ask,
      idk: it.idk,
      created: new Date().toISOString(),
      issued: null,
      identified: null
    };
    this.nuts[newNut.id] = newNut;
    return newNut;
  }

  async retrieveNut(id) {
    return this.nuts[id];
  }

  async updateNut(it) {
    if (this.nuts[it.id]) {
      this.nuts[it.id] = it;
      return it;
    }
    return null;
  }

  async createSqrl(it) {
    const sqrl = {
      idk: it.idk,
      suk: it.suk,
      vuk: it.vuk,
      user_id: it.user_id,
      created: new Date().toISOString(),
      disabled: null,
      superseded: null
    };
    this.sqrl[sqrl.idk] = sqrl;
    return sqrl;
  }

  async retrieveSqrl(idks) {
    return idks.reduce((memo, idk) => [...memo, this.sqrl[idk] || null], []);
  }

  async retrieveSqrlByUser(id) {
    try {
      return Object.values(this.sqrl).find(sqrl => sqrl.user_id === id);
    } catch (ex) {
      return null;
    }
  }

  async updateSqrl(it) {
    if (this.sqrl[it.idk]) {
      this.sqrl[it.idk] = it;
      return it;
    }
    return null;
  }

  // Not part of the spec, but useful
  // Create an account
  async createUser() {
    const user = {
      id: Object.keys(this.users).length + 1,
      created: new Date().toISOString()
    };
    this.users[user.id] = user;
    return user;
  }

  async retrieveUser(id) {
    return this.users[id];
  }
}

module.exports = MemorySqrlStore;
