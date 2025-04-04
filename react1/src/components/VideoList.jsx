const videos= [
    {
        name:'piska +15 sm',
        duration:'15 minut',
        id:'1',
    },
    {
        name:'neti deneg? tebya zhdet 1Xbet',
        duration:'5 minut',
        id:'2',
    },
    {
        name:'stream Minecraft Hardcore 99 hours',
        duration:'99 minut',
        id:'3',
    }
]


export function VideoList(){
return(
    <>
    <h1>Video List</h1>
    {
        videos.map((video) => {
        return(
            <div key={video.id}>
            <p>{video.name}</p>
            <p>{video.duration}</p>
            <button>PODPESATSA</button>
            </div>
        )})
    }
    </>
);
}
