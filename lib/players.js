import fetch from 'node-fetch'

export async function getPlayerData() {
    const res = await fetch('')
    return res.json()
}