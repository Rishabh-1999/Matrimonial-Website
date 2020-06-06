var table;

$(document).ready(function () {
	table = $('#managePeople').DataTable({
		"processing": true,
		"serverSide": true,
		"dataSrc": "",
		"ajax": {
			"url": "/admin/managePeople",
			"type": "POST",
		},
		"columns": [{
				"data": "firstname"
			},
			{
				"data": "email",
			},
			{
				"data": "gender"
			},
			{
				"data": "type"
			},
			{
				"data": "isVerfied"
			},
		],
	});
});