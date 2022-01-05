
import $ from "jquery"
import env from '../config/environment'

export default function CheckDuplicateVal({name, route, key, label, currentValue, isNumber}) {
	$.validator.addMethod(
		name,
		function (value, e) {
			var req = false
			let encodeFilters = encodeURIComponent(JSON.stringify([key,"=",e.value]))
			$.ajax({
				type: "GET",
				async: false,
				url: `${env.API_URL}/master/${route}?filters=${encodeFilters}`,
				success: function (res) {
					let element = isNumber ? parseInt(e.value) : e.value
					// console.log(currentValue, element,  currentValue === element, "here")
					if (res.items.length !== 0) {
							req = currentValue ? currentValue === element : false
					} else {
						req = true
					}
				},
			})

			return req
		},
		`${label} already exists`,
	)
}