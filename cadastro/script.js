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

    // Validação cadastro
    const form = document.getElementById('cadastroForm');
    const tipo = document.getElementById('tipoCadastro');
    if(form) form.addEventListener('submit', e => {
        e.preventDefault();
        if(!cpfInput.value || cpfInput.value.replace(/\D/g,'').length!==11){
            alert('CPF inválido'); return;
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

});
