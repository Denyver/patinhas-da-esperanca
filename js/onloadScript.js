window.onload = () => {
    let wls = window.location.search;
    let urlserach = new URLSearchParams(wls);
    document.getElementById('id_show').innerHTML = urlserach.get('id');
}
