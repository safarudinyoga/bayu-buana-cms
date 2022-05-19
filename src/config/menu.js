import Api from './api';

const api = new Api()
const getMenu = async() => {
    try {
        let {data} = await api.get('/master/menu-links?size=999&sort=sort')
        let parentMenu = data.items.filter(m => !m.parent_link_id)
        let menu = parentMenu.map(pm => {
            pm.submenu = data.items.filter(m => m.parent_link_id === pm.id).sort((a,b) => {
                const valA = a.description.toUpperCase()
                const valB = b.description.toUpperCase()
                if (valA < valB) return -1
                if (valA > valB) return 1
                return 0;
            })
            return pm
        })
        let stringifyMenu = JSON.stringify(menu)
        localStorage.setItem('menu', stringifyMenu)
        return menu
    } catch(e) {
        console.log(e)
        throw e
    }
}

export default getMenu