import { Observable } from "rxjs";

export function fetchData<T>(url: string): Observable<T> {
	return new Observable<T>(observer => {
		fetch(url)
			.then(response => response.json())
			.then((data: T) => {
				observer.next(data);  // Emit the data
				observer.complete();  // Mark the observable as complete
			})
			.catch(error => observer.error(error)); // Handle any errors
	});
}
