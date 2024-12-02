// ------------------------------
const textarea = document.querySelector('textarea[name="teksnya"]');
const formData = new FormData();
// ------------------------------

const closeFile = document.querySelector(".closeFile");
if (closeFile) {
    closeFile.addEventListener("click", function() {
        const filePreview = document.getElementById('filePreview');
        const fileInput = document.getElementById('fileInput');
        const fileContent = document.getElementById('fileContent');
        if (filePreview) {
            filePreview.style.display = 'none';
            fileContent.innerHTML = '';
        }
        if (fileInput) {
            fileInput.type = '';
            fileInput.type = 'file';
        }
    });
}

textarea.addEventListener('paste', async (event) => {
    const clipboardItems = event.clipboardData.items;
    
    for (let item of clipboardItems) {
        if (item.kind === 'file') {
            const filePreview = document.getElementById('filePreview');
            filePreview.style.display = 'block';
            const fileContent = document.getElementById('fileContent');
            const file = item.getAsFile();
            
            if (file) {
                formData.append('file', file);
                console.log("Tipe file:", file.type);
                const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                if (validImageTypes.includes(file.type)) {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.alt = 'Image Preview';
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '300px';
                    fileContent.appendChild(img);
        
                } else if (file.type === 'application/pdf') {
                    fileContent.innerText += file.name;
                } else if (file.type.startsWith('text/')) {
                    fileContent.innerText += file.name;
                } else {
                    fileContent.textContent = 'Preview not available for this file type';
                }
                
                event.preventDefault();
                return;
            } else {
                filePreview.style.display = 'none'; 
            }
        }
    }
});

function scroll(idName) {
    const scrollContainer = document.getElementById(idName);
    const isNearBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop <= scrollContainer.clientHeight + 100;
    if (isNearBottom) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
}

function scrollNow(idName) {
    const scrollContainer = document.getElementById(idName);
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
}

function adjustHeight(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 300) + 'px';
}

function handleKeyDown(event) {
    if (event.ctrlKey && event.key === 'Enter') {
        processSubmission(event.target, null);
        event.preventDefault();
    } else if (event.ctrlKey && event.altKey && (event.key === 'l' || event.key === 'L')) {
        processSubmission(event.target, 'left');
        event.preventDefault();
    } else if (event.ctrlKey && event.altKey && (event.key === 'r' || event.key === 'R')) {
        processSubmission(event.target, 'right');
        event.preventDefault();
    }
}

function handleClick() {
    const textarea = document.querySelector('textarea');
    processSubmission(textarea, null);
}

function processSubmission(textarea, indikasi) {
    submit(textarea, indikasi); 
    formData.append('teksnya', textarea.value);
    textarea.value = '';
    textarea.style.height = 'auto';
    adjustHeight(textarea);
    if (indikasi === null) {
        scrollNow('ai1');
        scrollNow('ai2');
        submitForm(null);
    } else if (indikasi === 'left') {
        scrollNow('ai1');
        submitForm(indikasi);
    } else if (indikasi === 'right') {
        scrollNow('ai2');
        submitForm(indikasi);
    }
}

function escapeHTMLforreq(text) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}

function submit(textarea, indikasi) {
    function createContainer() {
        const container = document.createElement('div');
        container.className = 'request container text-light w-100 d-flex flex-wrap justify-content-end';
        container.style.margin = '2rem 0';

        const innerDiv = document.createElement('div');
        innerDiv.className = 'text-wrap';
        innerDiv.style.overflowWrap = 'break-word';
        innerDiv.style.borderRadius = '10px';
        innerDiv.style.padding = '0.5rem 1rem';
        innerDiv.style.backgroundColor = '#3C3D37';
        innerDiv.style.maxWidth = '60%';
        innerDiv.innerHTML = escapeHTMLforreq(textarea.value)
            .replace(/ /g, '&nbsp;')
            .replace(/\n/g, '<br>');

        container.appendChild(innerDiv);
        return container;
    }
    if (indikasi === null) {
        document.getElementById('mainContainer1').appendChild(createContainer());
        document.getElementById('mainContainer2').appendChild(createContainer());
    } else if (indikasi === 'left') {
        document.getElementById('mainContainer1').appendChild(createContainer());
    } else if (indikasi === 'right') {
        document.getElementById('mainContainer2').appendChild(createContainer());
    }
}

function submitForm(indikasi) {
    if (indikasi === null) {
        Promise.all([
            fetchStream1(formData),
            fetchStream2(formData)
        ])
        .then (()=> {
            console.log("Pengiriman berhasil");
            const formData = new FormData();
        })
        .catch(error => {
            console.error('Ada masalah dengan pengiriman:', error);
        });
    } else if (indikasi === 'left') {
        fetchStream1(formData)
        .then(() => console.log("Pengiriman kiri berhasil"))
        .catch(error => console.error("Masalah dengan pengiriman kiri:", error));
    } else if (indikasi === 'right') {
        fetchStream2(formData)
        .then(() => console.log("Pengiriman kanan berhasil"))
        .catch(error => console.error("Masalah dengan pengiriman kanan:", error));
    }
}

// Fungsi untuk stream pertama
function fetchStream1(formData) {
    return fetch('stream1.php', {
        method: 'POST',
        body: formData
    })
    .then(response => handleStreamResponse1(response))
    .catch(error => console.error('Error in stream 1:', error));
}

// Fungsi untuk stream kedua
function fetchStream2(formData) {
    return fetch('stream2.php', {
        method: 'POST',
        body: formData
    })
    .then(response => handleStreamResponse2(response))
    .catch(error => console.error('Error in stream 2:', error));
}

// Fungsi untuk menangani respons dari stream pertama
function handleStreamResponse1(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const motherElemen = document.getElementById('mainContainer1');
    const outputContainer = document.createElement('div');
    outputContainer.className = 'isi container bg-dark text-light w-100 d-flex flex-wrap mb-2';

    const idJumlahRespon = `isi${generateRandomString(4)}`;
    console.log(idJumlahRespon)
    outputContainer.id = idJumlahRespon;

    motherElemen.appendChild(outputContainer);
    const mainChild = document.createElement('div');
    mainChild.style.maxWidth = '100%';
    outputContainer.appendChild(mainChild);

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    let isInCodeBlock = false;
    let codeBuffer = '';
    let isSisabuffer = false;
    let isInsideBacktick = true;
    let newCode = true;
    let idnewCode = null;
    let idStrong = null;

    async function read() {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true }).replace(/\*/g, "").replace(/\###/g, "");

            for (let char of chunk) {
                console.log('CHUNK--->',chunk);
                if (char === "`" && !isInCodeBlock && chunk.includes('```')) {
                    isInCodeBlock = true;
                    codeBuffer = '';
                    continue;
                } else if (isInCodeBlock) {
                    codeBuffer += char;
                    console.log('KODE BUFFER===',codeBuffer);
                    if (codeBuffer.match(/``(\w+)\s*\n/)) {
                        if (newCode){
                            // Membuat elemen <pre><code> hanya sekali saat awal blok kode
                            const languageMatch = codeBuffer.match(/``(\w+)/);
                            const language = languageMatch ? languageMatch[1] : 'plaintext';
                    
                            const pre = document.createElement('pre');
                            pre.className = `m-0 rounded`;
                            pre.style.maxWidth = '100%';
                            mainChild.appendChild(pre);

                            const code = document.createElement('code');
                            idnewCode = `id${generateRandomString(4)}`;
                            code.id = idnewCode;
                            code.className = `language-${language} p-0 m-0 match-braces line-numbers`;
                            code.style.fontFamily = "'JetBrains Mono', monospace";
                            pre.appendChild(code);
                            highlightAllUnderId(idnewCode);
                            newCode = false;
                        }
                        // Deteksi akhir blok kode "```"
                        if (codeBuffer.endsWith("```")) {
                            isInCodeBlock = false; 
                            codeBuffer = '';
                            isSisabuffer = true;
                            console.log("SUDAH SELESAI KODENYA");
                            newCode = true;
                            highlightAllUnderId(idnewCode);
                            isInsideBacktick = true;
                            continue;
                        } else if (isInCodeBlock) {
                            const lastPreCodeElement = document.getElementById(idnewCode);
                            if (lastPreCodeElement && char !== "`") {
                                lastPreCodeElement.innerHTML += escapeHTML(char);
                                await new Promise(resolve => setTimeout(resolve, 1));
                            }
                            scroll('ai1');
                            continue;
                        }
                    } else if (isSisabuffer) {
                        if (char === '`' && isInsideBacktick && !chunk.match(/`\w+\n/) && !chunk.match(/``\w+\n/) && !chunk.match(/``/)) {
                            isInsideBacktick = false;
                            const strongElement = document.createElement('strong');
                            idStrong = generateRandomString(5);
                            strongElement.id = idStrong;
                            mainChild.appendChild(strongElement);
                            continue;
                        } 
                        if (!isInsideBacktick) {
                            const getStronglast = document.getElementById(idStrong);
                            if (char === '`'){
                                isInsideBacktick = true;
                                continue;
                            } else {
                                getStronglast.textContent += char;
                                await new Promise(resolve => setTimeout(resolve, 1));
                                continue;
                            }
                        } else if (char !== '`') {
                            mainChild.innerHTML += char === '\n' ? '<br>' : char;
                            await new Promise(resolve => setTimeout(resolve, 1));
                            scroll('ai1');
                            continue;
                        }
                    }
                    continue;
                } else {
                    if (char === '`' && isInsideBacktick && !chunk.match(/`\w+\n/) && !chunk.match(/``\w+\n/) && !chunk.match(/``/)) {
                        isInsideBacktick = false;
                        const strongElement = document.createElement('strong');
                        idStrong = generateRandomString(5);
                        strongElement.id = idStrong;
                        mainChild.appendChild(strongElement);
                        continue;
                    } 
                    if (!isInsideBacktick) {
                        const getStronglast = document.getElementById(idStrong);
                        if (char === '`'){
                            isInsideBacktick = true;
                            continue;
                        } else {
                            getStronglast.textContent += char;
                            await new Promise(resolve => setTimeout(resolve, 1));
                            continue;
                        }
                    } else if (char !== '`') {
                        mainChild.innerHTML += char === '\n' ? '<br>' : char;
                        await new Promise(resolve => setTimeout(resolve, 1));
                        scroll('ai1');
                    }
                }
            }
        }
        if (isInCodeBlock && codeBuffer.trim().length > 0) {
            for (char of codeBuffer) {
                await new Promise(resolve => setTimeout(resolve, 1));
                if (char === '`' && isInsideBacktick && !chunk.match(/`\w+\n/) && !chunk.match(/``\w+\n/) && !chunk.match(/``/)) {
                    isInsideBacktick = false;
                    const strongElement = document.createElement('strong');
                    idStrong = generateRandomString(5);
                    strongElement.id = idStrong;
                    mainChild.appendChild(strongElement);
                    continue;
                } 
                if (!isInsideBacktick) {
                    const getStronglast = document.getElementById(idStrong);
                    if (char === '`'){
                        isInsideBacktick = true;
                        continue;
                    } else {
                        getStronglast.textContent += char;
                        continue;
                    }
                } else if (char !== '`') {
                    mainChild.innerHTML += char === '\n' ? '<br>' : char;
                    scroll('ai1');
                }
            }
        }
    }
    read();
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function escapeHTML(html) {
    const text = document.createElement('span');
    text.textContent = html;
    return text.innerHTML;
}

function highlightAllUnderId(elemen) {
    const codeBlocks = document.getElementById(elemen);
    Prism.highlightElement(codeBlocks);
}

// Fungsi untuk menangani respons dari stream kedua
function handleStreamResponse2(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const motherElemen = document.getElementById('mainContainer2');
    const outputContainer = document.createElement('div');
    outputContainer.className = 'isi container bg-dark text-light w-100 d-flex flex-wrap mb-2';

    const idJumlahRespon = `isi${generateRandomString(4)}`;
    console.log(idJumlahRespon)
    outputContainer.id = idJumlahRespon;

    motherElemen.appendChild(outputContainer);
    const mainChild = document.createElement('div');
    mainChild.style.maxWidth = '100%';
    outputContainer.appendChild(mainChild);

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    let isInCodeBlock = false;
    let codeBuffer = '';
    let isSisabuffer = false;
    let isInsideBacktick = true;
    let newCode = true;
    let idnewCode = null;
    let idStrong = null;

    async function read() {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true }).replace(/\*/g, "").replace(/\###/g, "");

            for (let char of chunk) {
                console.log('CHUNK--->',chunk);
                if (char === "`" && !isInCodeBlock && chunk.includes('```')) {
                    isInCodeBlock = true;
                    codeBuffer = '';
                    continue;
                } else if (isInCodeBlock) {
                    codeBuffer += char;
                    console.log('KODE BUFFER===',codeBuffer);
                    if (codeBuffer.match(/``(\w+)\s*\n/)) {
                        if (newCode){
                            // Membuat elemen <pre><code> hanya sekali saat awal blok kode
                            const languageMatch = codeBuffer.match(/``(\w+)/);
                            const language = languageMatch ? languageMatch[1] : 'plaintext';
                    
                            const pre = document.createElement('pre');
                            pre.className = `m-0 rounded`;
                            pre.style.maxWidth = '100%';
                            mainChild.appendChild(pre);

                            const code = document.createElement('code');
                            idnewCode = `id${generateRandomString(4)}`;
                            code.id = idnewCode;
                            code.className = `language-${language} p-0 m-0 match-braces line-numbers`;
                            code.style.fontFamily = "'JetBrains Mono', monospace";
                            pre.appendChild(code);
                            highlightAllUnderId(idnewCode);
                            newCode = false;
                        }
                        // Deteksi akhir blok kode "```"
                        if (codeBuffer.endsWith("```")) {
                            isInCodeBlock = false; 
                            codeBuffer = '';
                            isSisabuffer = true;
                            console.log("SUDAH SELESAI KODENYA");
                            newCode = true;
                            highlightAllUnderId(idnewCode);
                            isInsideBacktick = true;
                            continue;
                        } else if (isInCodeBlock) {
                            const lastPreCodeElement = document.getElementById(idnewCode);
                            if (lastPreCodeElement && char !== "`") {
                                lastPreCodeElement.innerHTML += escapeHTML(char);
                                await new Promise(resolve => setTimeout(resolve, 1));
                            }
                            scroll('ai2');
                            continue;
                        }
                    } else if (isSisabuffer) {
                        if (char === '`' && isInsideBacktick && !chunk.match(/`\w+\n/) && !chunk.match(/``\w+\n/) && !chunk.match(/``/)) {
                            isInsideBacktick = false;
                            const strongElement = document.createElement('strong');
                            idStrong = generateRandomString(5);
                            strongElement.id = idStrong;
                            mainChild.appendChild(strongElement);
                            continue;
                        } 
                        if (!isInsideBacktick) {
                            const getStronglast = document.getElementById(idStrong);
                            if (char === '`'){
                                isInsideBacktick = true;
                                continue;
                            } else {
                                getStronglast.textContent += char;
                                await new Promise(resolve => setTimeout(resolve, 1));
                                continue;
                            }
                        } else if (char !== '`') {
                            mainChild.innerHTML += char === '\n' ? '<br>' : char;
                            await new Promise(resolve => setTimeout(resolve, 1));
                            scroll('ai2');
                            continue;
                        }
                    }
                    continue;
                } else {
                    if (char === '`' && isInsideBacktick && !chunk.match(/`\w+\n/) && !chunk.match(/``\w+\n/) && !chunk.match(/``/)) {
                        isInsideBacktick = false;
                        const strongElement = document.createElement('strong');
                        idStrong = generateRandomString(5);
                        strongElement.id = idStrong;
                        mainChild.appendChild(strongElement);
                        continue;
                    } 
                    if (!isInsideBacktick) {
                        const getStronglast = document.getElementById(idStrong);
                        if (char === '`'){
                            isInsideBacktick = true;
                            continue;
                        } else {
                            getStronglast.textContent += char;
                            await new Promise(resolve => setTimeout(resolve, 1));
                            continue;
                        }
                    } else if (char !== '`') {
                        mainChild.innerHTML += char === '\n' ? '<br>' : char;
                        await new Promise(resolve => setTimeout(resolve, 1));
                        scroll('ai2');
                    }
                }
            }
        }
        if (isInCodeBlock && codeBuffer.trim().length > 0) {
            for (char of codeBuffer) {
                await new Promise(resolve => setTimeout(resolve, 1));
                if (char === '`' && isInsideBacktick && !chunk.match(/`\w+\n/) && !chunk.match(/``\w+\n/) && !chunk.match(/``/)) {
                    isInsideBacktick = false;
                    const strongElement = document.createElement('strong');
                    idStrong = generateRandomString(5);
                    strongElement.id = idStrong;
                    mainChild.appendChild(strongElement);
                    continue;
                } 
                if (!isInsideBacktick) {
                    const getStronglast = document.getElementById(idStrong);
                    if (char === '`'){
                        isInsideBacktick = true;
                        continue;
                    } else {
                        getStronglast.textContent += char;
                        continue;
                    }
                } else if (char !== '`') {
                    mainChild.innerHTML += char === '\n' ? '<br>' : char;
                    scroll('ai2');
                }
            }
        }
    }
    read();
}

document.querySelectorAll('.fileButton').forEach(button => {
    button.addEventListener('click', function() {
        console.log("Tombol diklik");
        document.getElementById('fileInput').click();
    });
});
document.getElementById('fileInput').addEventListener('change', function() {
    const filePreview = document.getElementById('filePreview');
    filePreview.style.display = 'block';
    
    const fileContent = document.getElementById('fileContent');
    const file = this.files[0];

    
    if (file) {
        console.log("Tipe file:", file.type);
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (validImageTypes.includes(file.type)) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.alt = 'Image Preview';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '300px';
            fileContent.appendChild(img);

        // Pratinjau untuk file PDF
        } else if (file.type === 'application/pdf') {
            fileContent.innerText += file.name;

        // Pratinjau untuk file teks
        } else if (file.type.startsWith('text/')) {
            fileContent.innerText += file.name;

        // Tipe file lainnya
        } else {
            fileContent.textContent = 'Preview not available for this file type';
        }
    } else {
        filePreview.style.display = 'none'; 
    }
});