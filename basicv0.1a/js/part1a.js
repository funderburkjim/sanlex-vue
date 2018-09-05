// Define a new component called button-counter
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});
new Vue({ el: '#components-demo' });

/* Oddly, the component needs to be registered BEFORE
  any element (such as the root element at #blog-post-demo)
  that uses it.
*/
Vue.component('blog-post', {
  props: ['title','id'],
  template: '<h4>{{ id }}: {{ title }}</h4>'
});

new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
});

Vue.component('blog-post1', {
  props: ['post'],
  template: '<h4>{{ post.id }}: {{ post.title }}</h4>'
});

new Vue({
  el: '#blog-post-demo1',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
});

Vue.component('blog-post2', {
  props: ['post'],
  template: `
  <div>
     <h4>{{ post.id }}: {{ post.title }}</h4>
     <button v-on:click="$emit('enlarge-text')">
       Enlarge text
     </button>
     <div v-html="post.content"></div>
  </div>
   `
});

new Vue({
  el: '#blog-post-events-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ],
    postFontSize:1
  }
});
