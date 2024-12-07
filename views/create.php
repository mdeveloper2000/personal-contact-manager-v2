<?php
    require_once("./partials/header.php");
?>
    
<div class="container">
        <?php require_once("./partials/title.php"); ?>
    </div>
    <main>
        <form method="post" enctype="multipart/form-data" class="create-form">
            <input type="hidden" name="action" value="store">
            <div class="label">
                <h2>Novo Contato</h2>
            </div>
            <div>
                <input type="text" name="name" placeholder="Nome" maxlength="35" 
                onblur="this.value=this.value.trim();" required>
            </div>
            <div>
                <input type="text" name="phone" placeholder="Telefone" maxlength="15" 
                onblur="this.value=this.value.trim();" required>
            </div>
            <div>
                <input type="email" name="email" placeholder="E-mail" maxlength="50" 
                onblur="this.value=this.value.trim();" required>
            </div>
            <div>
                <textarea name="annotations" placeholder="Anotações" rows="5" maxlength="200"></textarea>
            </div>                      
            <a class="button error" href="index.php">Cancelar</a>
            <button class="right" type="submit">Salvar</button>        
            <div class="label error create-message"></div>
        </form>        
    </main>
    <?php include_once("./partials/footer.php"); ?>
</div>

<script src="../assets/js/create.js"></script>