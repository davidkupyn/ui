export async function load() {
	const data = await fetch('https://info-car.pl/api/word/word-centers/exam-schedule', {
		headers: {
			accept: 'application/json, text/plain, */*',
			'accept-language': 'pl-PL',
			authorization:
				'Bearer eyJraWQiOiJpYy0xIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkYXZpZGt1cHluQGdtYWlsLmNvbSIsInVpZCI6IjAyOTRiNDVmLWJhYjctNGYyMi1hZGE5LTgxZjVlMTZkN2FhYyIsInNjcCI6WyJlbWFpbCIsIm9wZW5pZCIsInByb2ZpbGUiLCJyZXNvdXJjZS5yZWFkIl0sImhhc0FjYyI6dHJ1ZSwiYXpwIjoiY2xpZW50IiwiaXNzIjoiaHR0cHM6XC9cL2luZm8tY2FyLnBsXC9vYXV0aDJcLyIsImV4cCI6MTY5NDYxODQ0NiwiaWF0IjoxNjk0NjE0ODQ2LCJqdGkiOiJhMzBiNjA0Mi0wYjliLTQ0YmUtYjRhMi05ZGY1MDcxMDk3MmMiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXX0.iBub-Xs1UG_E7K4-zEpSLGGdktkXNPbpxFB_wrqo95CH2qsmL4UZC40NOXn1wktqZaVC3squvfc4DgKyRV6awR4htsufkOICkm0J241VsdrDb74-C1QB4eP10rXH-UgaVexn1puw_gVVT3_xIs_b1rzem29zi-JuKzSMtk7YFEE',
			'content-type': 'application/json',
			'sec-ch-ua': '"Not)A;Brand";v="24", "Chromium";v="116"',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': '"macOS"',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-origin',
			cookie:
				'JSESSIONID=B059CF98E7F27B4F6101D4C08614DA28; TS01602c5e=016ccbb8ca633f502f6c81b07fd9bbae7f4daa7d532adcee80a0276615b1231bc563f0bfb8fdb325d23ba0a0437c306d23fd03bcfd40ca6cc5e564c853f4f065532475e669; TS01f5bb17=016ccbb8ca1ad2f0e59c7b6990705dd720f8505a522adcee80a0276615b1231bc563f0bfb88180780412627143724d288e44c6fe20',
			Referer:
				'https://info-car.pl/new/prawo-jazdy/zapisz-sie-na-egzamin-na-prawo-jazdy/wybor-terminu',
			'Referrer-Policy': 'strict-origin-when-cross-origin'
		},
		body: '{"category":"B","endDate":"2023-11-16T15:21:09.035Z","startDate":"2023-09-15T14:21:09.035Z","wordId":"26"}',
		method: 'PUT'
	});
	const json = (await data.json()) as Response;
	if (!json.schedule?.scheduledDays?.length) {
		return {
			date: null
		};
	}
	for (const day of json.schedule.scheduledDays) {
		if (!day.scheduledHours?.length) {
			continue;
		}
		for (const hour of day.scheduledHours) {
			if (hour.practiceExams?.length) {
				return { date: new Date(hour?.practiceExams[0]?.date ?? '').toLocaleString('PL-pl') } as {
					date: string;
				};
			}
		}
	}
	return {
		date: null
	};
}

interface Response {
	organizationId: string;
	isOskVehicleReservationEnabled: boolean;
	isRescheduleReservation: boolean;
	category: string;
	schedule: Schedule;
}
interface Schedule {
	scheduledDays?: ScheduledDaysEntity[] | null;
}
interface ScheduledDaysEntity {
	day: string;
	scheduledHours?: ScheduledHoursEntity[] | null;
}
interface ScheduledHoursEntity {
	time: string;
	theoryExams?: (TheoryExamsEntityOrPracticeExamsEntity | null)[] | null;
	practiceExams?: (TheoryExamsEntityOrPracticeExamsEntity1 | null)[] | null;
	linkedExamsDto?: null[] | null;
}
interface TheoryExamsEntityOrPracticeExamsEntity {
	id: string;
	places: number;
	date: string;
	amount: number;
	additionalInfo?: null;
}
interface TheoryExamsEntityOrPracticeExamsEntity1 {
	id: string;
	places: number;
	date: string;
	amount: number;
	additionalInfo?: null;
}
