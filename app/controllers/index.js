import Ember from 'ember';

const { get } = Ember;

function createPayload(ids=[1,2]) {
  return {
    data: ids.map(id => { return { type: 'comments', id }; })
  }
}

export default Ember.Controller.extend({
  unloadAll() {
    this.store.unloadAll('comment');
  },

  loadComments(set=true) {
    let post = this.get('model');
    let comments = this.store.peekAll('comment');
    let count = 0;
    comments.forEach(comment => {
      count++;
      if (comment) {
        Ember.set(comment, 'post', post);
      }
    });
    if (set) {
      this.set('comments', comments);
      this.set('commentsCount', count);
    } else {
      console.log('no set commentsCount',count);
    }
  },

  actions: {
    import() {
      this.unloadAll();
      this.store.pushPayload(createPayload([1,2]));
      this.loadComments();
    },
    importMixed() {
      this.unloadAll();
      this.store.pushPayload(createPayload([2,3]));
      this.loadComments();
    },
    importNew() {
      this.unloadAll();
      this.store.pushPayload(createPayload([4,5]));
      this.loadComments();
    },
    unloadAll() {
      this.unloadAll();
      this.loadComments();
      Ember.run.next(() => this.loadComments(false));
    }
  }
});
