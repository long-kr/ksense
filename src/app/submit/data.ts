import { SubmitData } from "@/lib/api/submit";

export const submitData: SubmitData = {
	high_risk_patients: [
		"DEMO002",
		"DEMO006",
		"DEMO008",
		"DEMO010",
		"DEMO012",
		"DEMO016",
		"DEMO019",
		"DEMO020",
		"DEMO021",
		"DEMO022",
		"DEMO027",
		"DEMO028",
		"DEMO031",
		"DEMO032",
		"DEMO033",
		"DEMO038",
		"DEMO040",
		"DEMO041",
		"DEMO045",
		"DEMO048",
	],
	fever_patients: [
		"DEMO005",
		"DEMO008",
		"DEMO009",
		"DEMO012",
		"DEMO021",
		"DEMO023",
		"DEMO037",
		"DEMO038",
		"DEMO047",
	],
	data_quality_issues: [
		"DEMO004",
		"DEMO005",
		"DEMO007",
		"DEMO023",
		"DEMO024",
		"DEMO035",
		"DEMO036",
		"DEMO043",
	],
};

// {
//     "success": true,
//     "message": "Assessment submitted successfully",
//     "requestId": "cle1::rcsl2-1767077491951-311048f370de",
//     "results": {
//         "score": 72.63888888888889,
//         "percentage": 73,
//         "status": "PASS",
//         "breakdown": {
//             "high_risk": {
//                 "score": 40,
//                 "max": 50,
//                 "correct": 20,
//                 "submitted": 22,
//                 "matches": 19
//             },
//             "fever": {
//                 "score": 14,
//                 "max": 25,
//                 "correct": 9,
//                 "submitted": 5,
//                 "matches": 5
//             },
//             "data_quality": {
//                 "score": 19,
//                 "max": 25,
//                 "correct": 8,
//                 "submitted": 6,
//                 "matches": 6
//             }
//         },
//         "feedback": {
//             "strengths": [],
//             "issues": [
//                 "🔄 High-risk patients: 19/20 correct. Check for 3 incorrectly included and 1 missed patients",
//                 "🔄 Fever patients: 5/9 correct, but 4 missed",
//                 "🔄 Data quality issues: 6/8 correct, but 2 missed"
//             ]
//         },
//         "attempt_number": 1,
//         "max_attempts": 3,
//         "remaining_attempts": 2,
//         "is_personal_best": true,
//         "best_score": 73,
//         "best_attempt_number": 1,
//         "can_resubmit": true,
//         "processed_in_ms": 202
//     }
// }
