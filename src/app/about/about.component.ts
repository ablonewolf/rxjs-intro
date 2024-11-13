import { Component, OnInit } from "@angular/core";
import { timer } from "rxjs";

@Component({
	selector: "about",
	templateUrl: "./about.component.html",
	styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
	constructor() {
	}

	ngOnInit() {

		const interval$ = timer(3000, 2000);

		const subscription = interval$.subscribe(
			value => {
				console.log(`stream 1 => ${ value }`);
			},
			error => console.log(error),
			() => {
				console.log(`completed parsing the string`)
			}
		)

		setTimeout(() => subscription.unsubscribe(), 15000);
	}
}
