import React, { useEffect } from "react"
import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { renderColumn } from "lib/translation"

export default function AirlineTable() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Airlines",
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            text: "Airlines",
          },
        ],
      }),
    )
  }, [])

  let params = {
    title: "Airlines",
    baseRoute: "/master/airlines/form",
    endpoint: "/master/airlines",
    deleteEndpoint: "/master/batch-actions/delete/airlines",
    activationEndpoint: "/master/batch-actions/activate/airlines",
    deactivationEndpoint: "/master/batch-actions/deactivate/airlines",
    columns: [
      {
        title: "Airline Code",
        data: "airline_code",
      },
      {
        title: "Airline Name",
        data: "airline_name",
        render: renderColumn("airline", "airline_name"),
      },
      {
        title: "Logo",
        data: "airline_asset.multimedia_description.url",
        searchable: false,
        orderable: false,
        render: (val, type) => {
          val = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABcCAYAAACLHFBgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAZBElEQVR4nOVdC8xlVXX+vvvP4PBUMaU8RBgQoRaZIsIMIC95KMUqFPsAbdHQaCEoEhNpKKihadomaokiJJJatDFFihbB+qC1thGVUbCh1gpFsRQQprxlhOL/WM231trnnHvn8Z//v+fcf2Zcmcd9nHvO3nvt9X5sYguAtdzD/zeL96T/N5Vfz8Z35l8Q2BXAAQAOhOFAg+1H8sWA7QbwBQB2ALC9wXT1s2Z4lsSTAB6B4X7Q/hvg3QDuMuAeGh4xVPcGDFPxArMxIPofwWp7CEsNOZSlgdu4x+gA9HZgwGz53GC7EDwCwAmAHQ3g5QB/qfxAiGRiOJCqP/S11seODNP3uq48ooLHAPwAwDcAfM00JOApXZvXadOYwebil1xyxHHJKCrXJBd8ADMaOJtrvwLAKQDOBHASgD1HbmGF8hJY/lZLnRRbcBn49IcVShqAGAzdkXjYDF8lcQMMt4B4ph6ffz+HsgG4NIhbOoRVu9iEq3yFA0B7G8GzAOwba+N8co7gXIUYqzZ72/kkroLygtqYH2r5KzxPNbD8PwCuA/AJAHc7nQGDfIBTXNkNk0TcxBC2lrtv6nFiO68G7B0A3wjYDoFLioIsKYG9jNv8SdXdEqtzKbVChppNg/ysGT5I4o7GmIW0RD+wZkJI46QUigYMav3BBfveID8O4HX+ragKNkv6rhfLYoO1scehBvKCeq3Bdpc3rrnODB8gcbfvKbMpI1PeBqtcjYe2XoTdJqryxa6kvf7OJVL0RhrZbAgz7AviTQDOhuHQ+N73+gxggwplNfSPvMKzY2NNiXcSmIbxQyAuB/BsstG5QLL+Mayxh3sbGPuUUQ1RMyXNL7fvG83sApDvojQ0s+UGzCRFFRFyDIC3wvAmELukvJvRz40uR8pC9jaHYapzSWoMNr0sRB/vBXEBgC812GQoQjmJPmRbrSV1Dq4C6sWynMgUwY8BuJHkSQS+BcNxIKcJarIhN0IV/zqAc0EcBOBigPf4fZi7ubLNnF0W9tXTJLRJpMD6fDQXIW4axH4AvmhmVzaQ5cjckBl0O6BOYS32aN5VE5gh8TKA1wO2ysy1vRkC2yVOTyXx5ca1Rc7Rd3Tob9sB+G0A7wZwWJKiqLIoB02E9bdaUmhRy9+ktCmD3UlS4/svgy2juEFc37lMY5dssDJiQ/6KdQk5rzfgMwwPxLQBy5KlaVLasYKTYPgqqB3MmaJ6+9oQU2bOMpHI+00D/ojA4fmcGaZNJS0vxeXE5FtsMi432DMEfxfAzQYbpBlSQVfssVOWmBKL4RZyZInH3+zIMhOClhcNOtlL7ETgZhAHwxxZU77cgVUxPEeWwYqr6nMwk+fjbBB304R0G1RIDWT1ziYbO0papOSrNuRNAN7pyHKdqntqH3RmY1UuBmcTWujLAHw0RfAsSLG8ehFdyaiQtr1PltgZMLGa4DqJuTSWZuVgsMo+wt/C7BUg3gPySQa1FlW89mz1B81nLEuFRK8/ArMPVMPO6zZi3iwNwmIglYNU6rcw9qcALjezYvy6nEmZ0/jrmqEWetrMVhrwSV1RPBKxhcMorVwcJhvN3+ie0wA+7P5F4m9yPuXz/PXEqG0qN6Q25/sB/HnxhjXXalzEjYWw5sNNdorJxrJLAVwi+yoRNHCOtknwGS0nXW0/A+DbXY+my7ohGbBa9o3LMv9GC4NE+EOA/T6A0wy4L4xd1ybdnZWL1ie1+f3d5xhrOmuwi2F8v8wVM9mR3QyBYykZ1SCoxZX8OY/EVVqo1G410KY/dmPgukK6hHT9TwE7GOD96eVwgTgqtNcO+SPDy5/scCcYrgRxTn7tyk3Y6qF6oj9w49PoE5pLan+XRMOQ9jiGEsLFa4TVryX0ZwieCsMXU1WXV3uQxnCLZyRa6KxMhvSnCbzFkeD32rR6vLZhpMMVECkf/tVbzezjBJdX903k96n6h6bqTynUrbe/AeALZa0KF3WOMSmW6LJG7E5qrWElgM/kV5IxUulbIivvFl4dpwQCbwZwpJnNyTzQjTbF+1f7Tg39lFLx46V29rUkDwftx+kPnM7vml6SzkHY0caQZ18bNwn6ugy6ClmuNDVEW78Ic/9gBgt9QWOU1wPY2XeyufpdooULApNPwf12/vaP/dYRworg5CagsJe8IrRS7WbDnQAOBXBrQVpxHPWLtDBJZEMKSWa2oxmudySmFqtrFqOALAhhekDxTJOc8qeSHwTwqlgMWx7q+qJsEBGA8JJRXpxG8ggL1iL2is1NUEgrIQ43GLSbKYrlUwb3TX7ezJbDMOtGR79Ia1KyVP5p0n6NwBXhMY2Ihb5eKNIWTGGhI8sd4zvlNTB7T/JreSmKMr5oiHhipggY/rD62N0aNu/vndryx+kCmwqXBE4PTmDySaY3pZpSn5Cmiysh7wRxssydoL6Fc6HWv1iL3Uc9Pstg9j2QBxXnbguNsA0Uu0nsQwbxrwB4OOPy1la7auaLiBVJzQ/a5+cBvCHZ4/IJeP1jTcxmZfST/CHMDgbxXHgPIt7edl6tKSzzWJCyQa8vARxZ0x0iq/k0UYeyoN4Q1OA2Tmso7NH9mxL+4EBCxWCnw+y2RNbMBIK4wXboyNJavRTkZXWSTxXVaHez9ru1+B18n+4L4PuZUlZyLVrfrxXI9+juLHwFxOvclmZIgIXYMCMyooRBdgNwpxl2pwdQFbbZTKbI+JABhrQDDc+57xT4YTFdtEXbpBm02rUhA9wxVK5/n5ydFtQ16AFZmpk8J+LCR9KwZ5UoYwu71QhyQ3sE/hfAm0soJx2g/mT0AxlDcLeHYmnP8zUs3zkZtHv0oE18KxItK0/CrwI4pzaau2SFCcW6pcecdgFxZKodg8WsqJDWcE6VsM4/w+wvElVNh3FfEEKFVUjp9wCsSuVtoMm20RhbUpjvb/fImuGi9I1JxvQ1yUpfSMNTajmq4MkiwNlN/VtPVwDxPtDZkhSogrT+tMYIeLp8Trvyoshvab+O8yKsZE+HMxf7kDgrFlHO3oaDqh8o4bPDU3mc3ZwB3Y49FlqjVO2fA+YGutYx0w36g1y4SIVwZeN3SKx0Z0HLdWyneVXeZp4jRcP5sHPkfrlIpiFpIfcH+EIfwZgbRLI4X7gtZuZemts958QzeycAERhXvuOKTDYSKPt5fISlNJG7SLz3bH/nYfv+qStUUp+EtLp9MsGU48SU1jScyJpHKJ52ZcnlnkTgM70Lcj4IR8pydg9Mm+VsQ2FT/gi6V+NAD0r2HqVogBI142F7b6yaYRyQczYX7UaYR0mLEtUv1Ikns6QdAOKEdGaVNIhxZFimCpmd6d6+SPnqJV9hY1AVoBhe4gQwtvOraI3hv1LWE8mnSN6SZljvbDHZeqbo+TNV9NFqXm0oTAJxe4tqEv9N78J5BLyuhdgtM4E72SlijWmHl8nckl9NiHW4N7+s/ylmtn1qqh2o9eRh6d1wr8akuKEgcthdg3tR90sZFJW3VaGD0hTcYJ8QeKDTDPvmGnegdAR2TkgkzSVxTQxlRWqR2LHfJ9lPAPwknzUJlCV9K8jpzz++DSW0dageLW7fr7tts5PqJa18dbitQjQanzYzuaw2Hy3tEIZXkqou7cRw3gmAwgFCVo+5+BuH4uIrCkf34HK/+PpUjdJz4vAGMEiudTDMduzADrOXlpJVz26aJFQ73bXT2X6Iu/JbTkKh38QAXBfe08j9O6AwCmERn+rYDpoXGjvdzNZnHkn3j6krMVeMkyCzmEfXoSQPsipRZ7PQhsW9zO+JycNwZjcf04bpcrdUHpO4qUp1XxTPmqygrstL6Ws9Hks0r4NaEowNyS+PYVkJznX3kBIJk/uLqpVqPHpSUE8n1nosCiP28v9KNGeS4B70ysl8nwdRPbWDXa5UrIHZIQZTUca8xmvHUGnzZnhxFyyxNDEpxdoThcztk8F+fxZCWne9QhpuE/LEsm6YLIRvILhH1TBmHIS9IB14E/MfOgQfDAe6YZ2Z3R+foHXmVEvZJYp6HswLKbTLBxPmJOFa99wp8xDSuAjboTMH3kIgzf94bT8CvF/UIrI6NoTag1iKBO00EPtTYaQl4CQlkm6gWPJmYVnL+y0VBA803FE1DLPxZIzXYBdxHEUbwtBFJcdn4hpigKc8MwKam4WJey4WBJmhT+Kb1ZbnmKwwf6+KTZeHKianOvFQiZ6lPGqLhTYI80YoE4aS/S6W9TNPjQxVfq6jsbgjwAs4zFQbEKVjDRu6o+zl+nXK5I187+8jXRH/NzZLNMP6ybrWEiK/QizwOwZToy562soi0/dH0gqiisTsSpJ7ZwuJ6MFR2wyhvUWBV3yQWN0ImY+mFqSYLPuuMkVY2jENIawEGIsvcxyEkXgikzfKrugbfYkRTzv3XPgUKwNpdItpC6QSqeI1ieJ1zpB2HkiV2SrDuJgOWadZCv8qZFVpz1Wl/HCFTp2G2lydUYEYiCn3rDdGpNjrVShWYyod63LhJsMY686Uy4x8hsDf5zdzi71lqRbMvodihScDvEr1bfosndphoBeFuFEUH32LSrF8QXxeRTwDs6dBinU/DWC9AU8ReAKwJ834OIl1AO4BuZrAnyRr93RPL7FNHYjm142JMMMDNUvoPfJQ8kW8tguwmwCqyFyLOjferbOMlTjNzL7gq5UhepKSHfr7jGRmiAF7jKB2/JMgnmCYFU+QfBzetRT+v+k3Qhq8Ve1zXoFaPzP3nuu6hyIc6ZlJXXpEFir2nfLAfOx+foQRPx52xPaMsahDTncRrio2U8VFbPF3NlNnAu5FUg1fHgSohV8Pw09BrAdsPcD1jSrQIWdIXTnUMBNd6m1QIKxXLwdwPIDXAnYUQHcsp5yslL2RKLOv9bgUpobGk8hrK1Muue9fJvH1rFZXOwmM1bcpRq97qzfjUFVYvdaNKQb/q7Z+Zjk5VeZKKP8jWsrGJfJSHGGwk2lU2toh1frGJcV+9JzODUNVTnd3ja8lKvfcME2Vw4Z12YfikeU4mcYccLmzlKh3y0JnjPkEH3lqaTWZVH2BM4uu2SfY68rCA63ci6KYpEzEgQSPz6yno0juroShKPly7u459KV/R1HeGsgqCpZXaDLKj8amsHsBPABwZS5pQ/PtXHpFVaThGiO+pXLX0vFzHP/h6uZvs41Evq6qcxoKR+QMBjPUs+caCHi++lwZcDLJ1wBORRpvYW2Kimd+siNJOY9Fhd/EqhXLgQ8CkAtuXLXeVNp5p0FJ+1TWlNcMdwjFVJGnQZN/ELT3lqTOnH8vHb1RcbPo2JPy03v5Fs0S4IEEjg1ZhKNA7lEp+skaPW8yKFHF800ba1jt3ziUhjLqeCDlZVy13p/1DajUNHIr0CEUKa7t6x2rjThX2llsDHfGjt26bu1ILn7KxVCroeRNZ/WlBfsuBhxBJc6SJ6iGC96cpeLH0RIpdlRQUZUXUq3NwhYp/KW3tlnaNnaY1vNrOZgiX7rY9vU+j76+y2G8FLCvmAxZ835Ni9ogazdWLBF2T/ZU9Ir+NGN9vRSaPy575R/FTDricPmuXhV51myXvth1KK3ZvSiCxL+0cYu1QhhJketdZjgoefr4yKq7V6s7jArEP6EucMmeSuOv1tS1trRZL2I8Ps6u3DabJbflvjtDDTLBUwA7MWXRdo2BSfubS4yoeaY2UGhAZQeNy2lq3iKtUy1yv9tmWVv4El1mzRjwJarFQ6iyi+ox0Ryqov3ZUEzIugGwcxdCTWtTFo3sSaeiLKBQZUpm1fo3ykg61lmd2dF16kPlFPAeVWEj+eiWpSLf1Oy7kwexXb3Nk0wYg5Xex7NjKh3BvOmdQHFR9kT0OS6QHdSC2Nsw+J5Vh9JPg3hLVuRqt81tirLWFlbXMC6yfeyQLMrLdyK9Q88pJE+E2SqQKgYv666+Hc4tsgTYN2HVBrdrBA2vRLiiQpMUfLZydXXAEn0BDXYrXZPhqmxQ7O2EWg2vpBjE9aG6h6r8ZyQuSR/5wBj1Whw99Sj7n1tgWxeXuJUWPI1X/3f/0OhMCoNSn/cuX+R91HUOlTaX9WBNI3YilR4huQun+ncQ/5ojnOsivBKVitLYiE8B+FBOMjuCbHaGJXNXdo2oai6bT/7MwD8AeF3j/Jo8QSjQUtrShh1KpyIG9SQV+XXqJXwYyJMAOxnhr1sRd4n4mcsjpyKxSldmRpEy6eBRsbtUtaIyXXVSFahqZt5oOlu2ACq2xS9L+YjEnKqhCudjf25jmanrqD77JwBvT7/ZEM+uPOHZyTQ/UwVmwynAfQE71hUGw6tB7DOyGiVD2WVRbKlFqtv9gNdIpsdFR18dBFAxI/faz9dcZX4ZFs/QtLW4cv9f6/3jtRtY9Wri0AlCQRoyduR1lzEs2aSRXGaGv0qPkDqtzTTyXeK4DtpcbsHsWc/tzeyVOpwA0VhL7fR2aPhbq1ax2fVNvrrsmrNkORqbgOrUmZncUJ9KZKn3vTRZdEJhxcOW4aCVJP7TgBW1dy89cLGfy6k/xfH5pNE+RnibvicDp66F6UeDFG1x0kP+gOA+BjuGrnZ7jw4VE6KxMxpUVNquV5btFoSgYagP3nJF5zmSalLzo4aJM68Z02pygTS/OFiY4S9Be7eZ+gA6YiokNU7MeyDP3lIP4HWJVJ0GIQoqpxeVmawwJBWZnQRVI3of+EoEDlERFjmPJYay33TYgrjOR0hcmB3H3UmwRk3r5gEu8NSHjLl5HvoPzEznUYaOF1qfEKFzU66F4XMegY0nSJ1WcK954NpLknoKFa1sGgqjVJRTZqWVbF3QSHtwr/0TpNoK2rpmoVMbJwEXeqaKjuLw0xqACwz2UZI/N5is9JsAuxnG/2gsemUhZhMRyZ8T8+iOwwy2U+V6jctnk11KKyzj2+JZ3TzQDIWWHo1q/3RFJv54CKYNdbV2TTnUQn4mT2i4JkPo/wbD95shCh9eUKSS+48B+FqYHQNyv9RH/NpGW/DIq3D26q7vkSdv9UA/TiuQpa47VyRHci5SRazb3Wgcr3dtNyUo1XhVoSIDXsUouY3rQzuIozrSym+eEruNIKcJQ4GcPAX3cBhvj1hf5H8sJBqxbDEe24QsJKHqck8H7ASAx8Fs/1SEynUzqc0Own3I4aDekiQ9TgSaNBMHBZGXwnC7cxJRV23gt4ZFr9ZQT12zb6rPfCOHr3Qni4ZXGw/qbctg+b9rhckK/7E0pymn1Anayq5ucutD4xFCXk8dvREqYJxUV+49zO5+EZBVgKlQLPc+VsDZvgDurA65tVBkjYcw3yXuH1T45XEQZyqcYXEumHrDtwmPb3NgRTUOv2A0GyPPgOFR78kvZ7UywBYZRR/jKI+i3XjTSQ3sOyR/q4pM+8CG1PJfBLB0ist/6tH5PGpxbUYGwm86htxeNMJ8hxRHRJ1LKGP5HWXsJSW59IPDtgtWHIXhkakwcr4HZ62yXV3JGCdHZSwZ5omd0hVjfELaVCZqXqgPjSYDWE7NSj/BtgeW/3r4J4OhorILAVyd3GYmnBzjn/HciXwpGmPqPn5YqeJdBK6JK2wmixtKKx1ug9rgTG0m2fkAr25G0Ls6uLSzhbsNu2doJY58VydRt88Mf2f0w86KetvgHls14iwD4ZrENJSbEtOXzLqhDpmEC7TNIQJtoLOS2SqZKN4UDelGA9a4yl8fBzVXJUNvnSzSSp1ehEsqZAkjaxJZ0Va9JHt3+PDOd3idKJM54zpJCHihJ9sAp/pX3vPez2zOt1sNpVnxxvkc6kMDFEU/28wekUM35tfPwdt99SAsm8sVkShuw68DeG9kK7kZoPPGMsa1ZWuRlpAbSyq7xwFzwJeqYgWAkKWckXDFbeYYyHGgt51dZTzFNHX0YiCFXKW6LxBHZcnKtE90uIJ/i6A4a5QFpePaPRcZev82yfMNuMM9gkZXMApWuzoZfWJtH5p2Wpze4zEVUdadRigF7TwC6/Kk8UE57rDkw066EfQIBIOofaAam14LWY/KbCG52vuHRM20dHp5eXpF1sR2cnUSbPiB5RCey54Au4K8OA3MEoaZKeGXEeHGXgdZtwgoEMlAIYc1dpXEXg3Tgdp4JON/mTIRI+2DBY7CxFhPnRSaD7ZyRK6/2wv0847f1mhGNuz1L5+ws7GXHZTvIo9RKZSqnGkkxz0G2F8DvFId5XIMHimuh9n+hL1xYaKyYliD9Md7LnwjN3FXMztLZ7xQgb5ybXpSrK5mLOWrG1MxR+e0AWttBE0jeziRMBLvU2T4k3Gkrz2aIXcFHZWxm96N4JiL8bovFpZEuA/lyMconIqq3LzAhhB2ho6rB/CKMlbLjMusGW4eADMSHaiWv5akNbKYi59pc5Wq+j0S/5D247fjgV6LOZXFjFlnEI+YFFU1YUm1sXLiekN0BOKqbN8Agx1CUFWQUlZeacDeVDpC48fDvpP5TDv/XtWO6rDzXTO71bO9DJ5A1FBVS8OVISpdCkRhS1KfR+WbwMtIrSqlbaaJLjOzfaiEHp0+brafkXsx0sifb4advbAiKEnehqe9wQm5joYHso2F6rHuheE+o06fHertMJWEW/kAS+7XUiKqwP8Df9unhTTmeB0AAAAASUVORK5CYII="
          if (type === 'myExport') {
            return val
          }
          if (val) {
            return '<img src="' + val + '" class="table-image"/>'
          }

          return ""
        },
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },
      {
        title: "Translated Airline Name",
        data: "airline_translation.airline_name",
        visible: false,
      },
    ],
    recordName: ["airline_code", "airline_name"],
  }
  return <BBDataTable {...params} />
}
