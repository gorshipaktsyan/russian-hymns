import StyledComponents from "../../../utils/sharedStyles";

const {InfoBox} = StyledComponents;

function Reference() {
    return (
        <InfoBox>
            <h3>Поиск гимнов</h3>
            <p>
                Кнопка поиска (лупа) в мобильной версии находится в правом нижнем углу,
                в десктопной версии — в правом верхнем.
            </p>
            <p>
                На странице поиска есть три поля: «Поиск по русскому номеру» (можно
                вводить несколько номеров через запятую), «Поиск по английскому номеру» и
                «Поиск по тексту» (на русском языке). Знаки препинания в поиске не учитываются.
            </p>

            <h3>Перелистывание гимнов</h3>
            <p>
                Перелистывание гимнов в мобильной версии осуществляется горизонтальным движением (жестом)
                пальца по экрану, в десктопной версии — стрелками у краёв экрана.
            </p>

            <h3>Главное меню</h3>
            <p>
                Главное меню открывается нажатием кнопки в левой верхней части окна. Главное меню представляет собой
                панель,
                которая выдвигается в левой части экрана. Все дальнейшие разделы справки описывают содержание главного
                меню.
            </p>

            <h3>Алфавитный указатель</h3>
            <p>
                Алфавитный указатель содержит список первых строк первых куплетов и припевов с
                сортировкой по алфавиту. Строки припевов выделены заглавными буквами.
            </p>

            <h3>Содержание</h3>
            <p>
                Все гимны в этом сборнике разделены на рубрики, которые, в свою очередь, делятся на подразделы.
                На странице «Содержание» рубрики и подразделы разворачиваются в виде иерархической структуры.
                На странице каждого гимна в первой строке указано название рубрики, во второй строке — название
                подраздела.
            </p>

            <h3>История</h3>
            <p>
                Гимны, открытые пользователем, сохраняются на странице «История». Открытый гимн сохраняется в
                истории через 30 секунд просмотра. В истории содержатся последние 100 гимнов.
            </p>

            <h3>Закладки</h3>
            <p>
                Список гимнов, к которым добавлены закладки, можно увидеть на странице «Закладки». Чтобы
                добавить закладку, откройте гимн нажмите кнопку с изображением закладки на верхней панели
                приложения. Закладка удаляется нажатием на ту же кнопку при открытом гимне или со страницы
                «Закладки» нажатием кнопки с изображением корзины.
            </p>

            <h3>Настройки</h3>
            <p>
                В текущей версии приложения нет страницы настроек, она появится позже. Сейчас
                размер шрифта можно изменять двойным нажатием (кликом) в правой и левой части экрана.
            </p>

            <h3>Проигрывание мелодий</h3>
            <p>
                В текущей версии приложения функция проигрывания мелодий гимнов не реализована, она появится позже.
            </p>
        </InfoBox>
    );
}

export default Reference;
