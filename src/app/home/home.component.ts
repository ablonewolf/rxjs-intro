import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { createHttpObservable } from "../../util/util";
import { map } from "rxjs/operators";
import { CourseResponse } from "../model/CourseResponse";

@Component({
	selector: "home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
	beginnerCourses: Course[] = [];
	advancedCourses: Course[] = [];

	constructor() {
	}

	ngOnInit() {
		const http$ = createHttpObservable<CourseResponse>('/api/courses');

		const courses$ = http$.pipe(
			map(response => Object.values(response["payload"]))
		);


		courses$.subscribe(courses => {
			this.beginnerCourses = courses.filter((course: Course) => course.category === 'BEGINNER');
			this.advancedCourses = courses.filter((course: Course) => course.category === 'ADVANCED');
		})
	}
}
