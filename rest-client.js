const vue = Vue.createApp({
  data() {
     return {
        bookInModal: { title: null },
        books: [],
        newBookForm: {
         title: '',
         author: '',
         year: '',
         pages: '',
         }
     }
  },
  async created() {
     this.books = await (await fetch(`http://localhost:8080/books`)).json();
  },
  methods: {
     getBook: async function (id) {
        this.bookInModal = await (await fetch(`http://localhost:8080/books/${id}`)).json()
        let bookInfoModal = new bootstrap.Modal(document.getElementById('bookInfoModal'), {})
        bookInfoModal.show()
     },

     createBook: async function () {
      console.log ("Create book triggered");
   
      const response = await fetch('http://localhost:8080/books', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(this.newBookForm),
      }).then(response => {
         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      }).then(book => {
         this.books.push(book);
         this.resetNewBookForm();
      })
   }
  }
}).mount('#app');