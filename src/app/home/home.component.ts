import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { createHttpObservable } from "../../util/util";
import { map, shareReplay } from 'rxjs/operators';
import { CourseResponse } from "../model/CourseResponse";
import { Observable } from "rxjs";

@Component({
	selector: "home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
	beginnerCourses$: Observable<Course[]>;
	advancedCourses$: Observable<Course[]>;

	constructor() {
	}

	ngOnInit() {
		const http$ = createHttpObservable<CourseResponse>('/api/courses');

		const courses$ = http$.pipe(
			map(response => Object.values(response["payload"])),
      shareReplay(1)
		);

		this.beginnerCourses$ = courses$.pipe(
			map(courses => courses.filter(course => course.category === 'BEGINNER'))
		);
		this.advancedCourses$ = courses$.pipe(
			map(courses => courses.filter(course => course.category === 'ADVANCED'))
		);
	}
}
