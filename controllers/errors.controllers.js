exports.logPsqlError = (err, req, res, next) => {
	if (err.code === '22P02') {
		res.status(400).send({ msg: 'Bad Request' });
	}
	next(err);
};

exports.logCustomError = (err, req, res, next) => {
	if (err.status) {
		res.status(err.status).send({ msg: err.msg });
	}
	next(err);
};

exports.logServerError = (err, req, res, next) => {
	console.log(err);
	res.status(500).send({ msg: 'Internal Server Error' });
};
