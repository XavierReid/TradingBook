const timestamp = () => {
            const date = Date(Date.now).toString();
            let dateArr = date.split(' ');
            return dateArr.slice(0, 5).join(' ');
        };
        console.log(timestamp());