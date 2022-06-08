import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(private firestore: Firestore) { }

  getConf(): Observable<any> {
    const ref = collection(this.firestore, 'configuration');
    return collectionData(ref, { idField: 'id' }) as Observable<any>;
  }
}
