document.addEventListener('DOMContentLoaded', function() {

    // Formatação CPF
    const cpfInput = document.getElementById('cpfCadastro');
    if(cpfInput) cpfInput.addEventListener('input', e => formatarCPF(e.target));

    // Mostrar/ocultar senha
    const toggle = document.getElementById('togglePasswordCadastro');
    const password = document.getElementById('senhaCadastro');
    if(toggle) toggle.addEventListener('click', () => {
        password.type = password.type === "password" ? "text" : "password";
        toggle.classList.toggle("fa-eye");
        toggle.classList.toggle("fa-eye-slash");
    });

    const erroCpf = document.getElementById('cpfErro');

    // Validação login
    const form = document.getElementById('cadastroForm');
    const tipo = document.getElementById('tipoCadastro');
    if(form) form.addEventListener('submit', e => {
        e.preventDefault();

        if(!cpfInput.value || !validaCpf(cpfInput.value)){
           
            erroCpf.textContent = "CPF inválido. Digite novamente.";
            return;
            
        }else{
               
            erroCpf.textContent = ""; // Limpa a mensagem de erro se o CPF for válido
                   
        }


        if(!password.value){ alert('Senha necessária'); return; }
        if(!tipo.value){ alert('Selecione um tipo'); return; }
        alert('Cadastro realizado com sucesso!');
        form.reset();
    });

    function formatarCPF(input){
        let value = input.value.replace(/\D/g,'');
        if(value.length>11) value=value.substring(0,11);
        if(value.length>0){
            if(value.length<=3) value=value;
            else if(value.length<=6) value=value.replace(/(\d{3})(\d+)/,'$1.$2');
            else if(value.length<=9) value=value.replace(/(\d{3})(\d{3})(\d+)/,'$1.$2.$3');
            else value=value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/,'$1.$2.$3-$4');
        }
        input.value = value;
    }

    // VALIDAÇÃO CPF
    const validaCpf =(cpf) =>{
        cpf = cpf.replace(/\D/g, '');

        if(cpf.length !== 11){
            console.error('CPF Inválido! Tente novammente.');
            return false;
        }

        if (/^(\d)\1{10}$/.test(cpf)){
             return false;
        }

        const proximoDigitoVerificador =(cpfIncompleto) =>{
            let somatoria = 0

            for (let i=0; i < cpfIncompleto.length; i++){
                let digitoAtual = cpfIncompleto.charAt(i);

                let constante = (cpfIncompleto.length + 1 - i);

                somatoria += Number(digitoAtual) * constante;
            
            }

            const resto = somatoria % 11;
            

            return resto < 2 ? "0" : (11 - resto).toString();

        }

        let primeiroDigitoVerificador = proximoDigitoVerificador(cpf.substring(0,9));
        let segundoDigitoVerificador = proximoDigitoVerificador(cpf.substring(0,9) + primeiroDigitoVerificador);
            

        let cpfCorreto = cpf.substring(0,9) + primeiroDigitoVerificador + segundoDigitoVerificador;


        if(cpf !== cpfCorreto) {
            console.error('CPF inválido. Tente novamente.');
            return false;
        }

        console.log("CPF Válido!");
        return true;

    }
         

});
