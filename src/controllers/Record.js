const hs = require("http-status");
const { list } = require("../services/Record");

const getResult = (req, res) => {
  //! values are used to filter for search
  const start = new Date(req.body.startDate);
  const end = new Date(req.body.endDate);
  const minCount = req.body.minCount;
  const maxCount = req.body.maxCount;

  //! list method is returned records filtered by date
  list(start, end)
    .then((recordList) => {
      const records = [];
      //! return error if record list empty due to a database conenction error or anything else
      if (recordList.length <= 0) {
        const responsePayload = {
          code: 3,
          msg: "record list is empty",
          records,
        };
        res.status(hs.INTERNAL_SERVER_ERROR).send(responsePayload);
      } else {
        //! filter record list by min and max count
        recordList.forEach((item) => {
          //! summation of counts array for comparison
          const total = item.counts.reduce((a, b) => a + b, 0);
          if (total > minCount && total < maxCount) {
            const finded = {
              key: item.key,
              createdAt: item.createdAt,
              totalCount: total,
            };
            //! add record to records array
            records.push(finded);
          }
        });

        if (records.length <= 0) {
          const responsePayload = {
            code: 3,
            msg: "record list is empty",
            records,
          };
          res.status(hs.INTERNAL_SERVER_ERROR).send(responsePayload);
        } 
        else{
          const responsePayload = {
            code: 0,
            msg: "Success",
            records,
          };
        
          res.status(hs.OK).send(responsePayload);
        }

        
      }
    })
    .catch(() =>
      res.status(hs.INTERNAL_SERVER_ERROR).send({
        code: 2,
        msg: "record list is empty",
        records,
      })
    );
};

module.exports = {
  getResult,
};
