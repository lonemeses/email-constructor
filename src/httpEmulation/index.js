

export const fakeAxiosPostTemplate =(templates) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            resolve({
                status: 200,
                data: {
                    message: 'Шаблон успешно сохранен',
                    templates
                }
            })

            reject(new Error('Не удалось сохранить шаблон'))
        }, 2000)
    })
}
