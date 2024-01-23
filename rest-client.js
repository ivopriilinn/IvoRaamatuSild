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
      },

      updateBook: async function (bookId, updatedBookData) {
         try {
           const response = await fetch(`http://localhost:8080/books/${bookId}`, {
             method: 'PUT',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify(updatedBookData),
           });
       
           if (response.ok) {
             const updatedBook = await response.json();
             console.log('Book updated:', updatedBook);
           } else {
             console.error('Failed to update the book');
           }
         } catch (error) {
           console.error('Error updating book:', error);
         }
       },

      deleteBook: async function (bookId) {
         try {
           const response = await fetch(`http://localhost:8080/books/${bookId}`, {
             method: 'DELETE',
             headers: {
               'Content-Type': 'application/json',
             },
           });
   
           if (response.ok) {
             this.books = this.books.filter(book => book.id !== bookId);
           } else {
             console.error('Failed to delete the book');
           }
         } catch (error) {
           console.error('Error:', error);
         }
      }
   }

}).mount('#app');