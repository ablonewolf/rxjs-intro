import { Observable } from "rxjs";

export function createHttpObservable(url: string): Observable<any> {
	return new Observable(observer => {
		fetch(url)
			.then(response => response.json())
			.then((data: any) => {
				observer.next(data);  // Emit the data
				observer.complete();  // Mark the observable as complete
			})
			.catch(error => observer.error(error)); // Handle any errors
	});
}
