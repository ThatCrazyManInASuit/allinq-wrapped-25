import {Line, Pie } from "react-chartjs-2";

export default function ReportExtra(props: {user: any}) {
    return (
        <div className="flex w-full flex-row ">
            <div className="w-1/2 h-[48vh]">
              <Line 
                data={{
                  labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
                  datasets: [
                    {
                      label: "",
                      data: props.user.hours
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    }
                  }
                }}
              />
            </div>
            <div className="w-1/2 h-1/2 flex flex-col">
              <div className="h-[20vh]">
                <Line 
                  data={{
                    labels: ["M", "T", "W", "R", "F"],
                    datasets: [
                      {
                        label: "",
                        data: props.user.days
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      }
                    }
                  }}
                />
              </div>
              <div className="w-full">
                <Pie
                  data={{
                    labels: ["Positive", "Neutral", "Negative"],
                    datasets: [
                      {
                        label: "messages",
                        data: [props.user.sentiment.positives, props.user.sentiment.neutrals, props.user.sentiment.negatives],
                        backgroundColor: [
                          "#00ae4b",
                          "#f7b50c",
                          "#f02521"
                        ],
                        borderColor: [
                          "#019e45ff",
                          "#e3a60aff",
                          "#d7211eff"
                        ],
                        borderWidth: 1
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "bottom"
                      },
                      tooltip: {
                        enabled: true
                      }
                    }
                  }}
                />
              </div>
              
            </div>
            
          </div>
    )
}