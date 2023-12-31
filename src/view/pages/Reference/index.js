import './index.scss'

function Reference () {
  return (
    <div className='reference-page'>
      <h3>Содержание</h3>
      <p>
        Все гимны и песни в этом сборнике разделены на рубрики, которые, в свою
        очередь, делятся на подразделы. К списку рубрик и подразделов можно
        перейти через главное меню — пункт "Содержание". Главное меню
        открывается горизонтальным движением пальца от левого края экрана или
        нажатием на кнопку с тремя горизонтальными линиями в левой верхней части
        окна.
      </p>
      <p>
        На странице каждого гимна в первой строке указано название рубрики, во
        второй строке — название подраздела.
      </p>

      <h3>Алфавитный указатель</h3>
      <p>
        Алфавитный указатель содержит отсортированный по алфавиту список первых
        строк первых куплетов и припевов. Строки припевов выделены заглавными
        буквами. Алфавитный указатель открывается через главное меню.
      </p>

      <h3>Обозначения</h3>

      <p>
        * Все гимны, помеченные звёздочкой, были первоначально написаны на
        английском языке Уитнессом Ли и редакционным отделом служения "Живой
        поток" (США).
      </p>
      <p>
        † Все гимны, помеченные крестиком, представляют собой сочинения
        различных авторов, переведённые на английский язык Уитнессом Ли и
        редакционным отделом служения "Живой поток" (США).
      </p>
      <p>
        Перед текстом каждого гимна указана размерность гимна и номер
        соответствующего гимна в английском сборнике, опубликованном служением
        "Живой поток" (номер указан в скобках). Поиск по номеру в английском
        сборнике в программе можно включить или выключить в настройках.
      </p>

      <h3>Перелистывание гимнов</h3>
      <p>
        Перелистывание гимнов осуществляется горизонтальным движением (жестом)
        пальца по экрану. Длина жеста должна быть не менее 2 см.
      </p>

      <h3>Размер шрифта гимнов</h3>
      <p>
        Размер шрифта гимнов можно изменить в настройках движением ползунка. Над
        ползунком вы можете видеть, как будет выглядеть текст гимнов.
      </p>

      <h3>Поиск гимнов</h3>
      <p>
        Гимны можно искать по номеру и по строке. При запуске приложения по
        умолчанию открывается страница поиска. На эту страницу можно перейти с
        любой страницы приложения, нажав кнопку лупы в верхней панели
        приложения.
      </p>
      <p>
        По умолчанию в приложении включён простой поиск — будут найдены все
        гимны, в которых встречается введённое вами слово или словосочетание.
        Знаки препинания в поиске не учитываются. В настройках можно включить
        расширенный поиск — будут найдены все гимны, в которых встречаются все
        слова в ведённой вами последовательности. При этом слова не обязательно
        должны располагаться в тексте рядом.
      </p>
      <p>
        Поиск по номеру в английском сборнике включается в настройках. По
        умолчанию такой поиск отключен. При его включении на странице поиска
        появляется поле "Поиск по англ. номеру".
      </p>

      <h3>Проигрывание мелодий</h3>
      <p>
        Для проигрывания мелодии гимна нажмите командную кнопку (в правой части
        верхней панели) и в списке команд выберите пункт "Проиграть мелодию".
        Для остановки проигрывания мелодии нажмите ту же кнопку и выберите пункт
        "Остановить проигрывание".
      </p>
      <h3>История</h3>

      <p>
        Гимны, открытые пользователем, сохраняются в разделе "История". Гимн,
        открытый перелистыванием, сохраняется в истории через 30 секунд
        просмотра. В истории содержатся последние 100 гимнов.
      </p>

      <h3>Закладки</h3>
      <p>
        Чтобы добавить закладку, нажмите кнопку с изображением закладки на
        верхней панели программы. Закладка удаляется нажатием на ту же кнопку.
        Список гимнов, к которым добавлены закладки, можно увидеть в разделе
        "Закладки".
      </p>

      <h3>Отключение экрана</h3>
      <p>
        По умолчанию экран вашего устройства будет отключаться через
        определённое время бездействия в соответствии с настройками,
        установленными в вашем приложении. Если вы хотите, чтобы экран оставался
        влючённым, пока вы используете приложение "Гимны", включите настройку
        "Держать экран включённым" в разделе "Настройки" нашего приложения.
      </p>
    </div>
  )
}

export default Reference
