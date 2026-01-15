import { Line } from "react-chartjs-2";
import data from "../public/data/output.json"

export default function StockBoard(props: {userId: string;}) {

    let datasets = [{
        label: data[props.userId as keyof typeof data].usernameDebug,
        data: data[props.userId as keyof typeof data].months,
        borderColor:'#02cc09',
        borderWidth: 2,
        fill: true
    }];

    

    for (let id in data) {
        if (id != props.userId) {
            datasets.push({
                label: data[id as keyof typeof data].usernameDebug,
                data: data[id as keyof typeof data].months,
                borderColor: '#cc1a02',
                borderWidth: 2,
                fill: true
            })
        }
    }

    

    return (
        <div className="bg-black h-[70vh] w-[100vh]">
            <div className="flex font-[Fake-Receipt] text-[3vh] gap-[2vh]">
                <p className="text-white">
                    {"Funny Carrot Network (ALLINQ) -"}
                </p>
                <p className="text-lime-500">
                    {` +${data[props.userId as keyof typeof data].percentile} ^`}
                </p>
            </div>
            
            <Line 
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                  datasets: datasets
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    }
                  },
                }}
              />
        </div>
    )
}