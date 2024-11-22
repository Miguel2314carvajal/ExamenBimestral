import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  dogs: string[] = [];
  books: any[] = [];

  constructor(private apiService: ApiService, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.loadDogs();
    this.loadBooks();
  }

  loadDogs() {
    const dogRequests = Array.from({ length: 10 }, () => this.apiService.getRandomDogs().toPromise());
    Promise.all(dogRequests).then(responses => {
      this.dogs = responses.map(response => response.message);
    });
  }

  loadBooks() {
    this.apiService.getBooks().subscribe(data => {
      this.books = data.results;
    });
  }

  saveAllToFirebase() {
    const batch = this.firestore.firestore.batch();
    
    // Guardar libros
    this.books.forEach(book => {
      const bookRef = this.firestore.collection('books').doc().ref;
      batch.set(bookRef, { title: book.title }); // Guardar solo el título
    });

    // Guardar perros
    this.dogs.forEach(dog => {
      const dogRef = this.firestore.collection('dogs').doc().ref; // Asegúrate de tener una colección 'dogs'
      batch.set(dogRef, { imageUrl: dog }); // Guardar la URL de la imagen
    });

    batch.commit().then(() => {
      console.log('Todos los libros y perros guardados en Firebase');
    });
  }
}
