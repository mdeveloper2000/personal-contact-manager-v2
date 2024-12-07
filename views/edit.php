<?php
    require_once("./partials/header.php");
    $id_edit = filter_input(INPUT_GET, "id", FILTER_VALIDATE_INT);
?>
    
<div class="container">
    <?php require_once("./partials/title.php"); ?>
    </div>
    <main>
        <div class="tabs two">
            <input id='tab-1' type='radio' name='tabgroupB' checked />
            <label class="pseudo button toggle" for="tab-1">Informações gerais</label>
            <input id='tab-2' type='radio' name='tabgroupB'>
            <label class="pseudo button toggle" for="tab-2">Lista de fotos</label>
                <div class="row">
                    <div>
                    <form method="post" class="edit-form">
                        <input type="hidden" name="action" value="store">
                        <input type="hidden" name="id_edit" id="id_edit" value="<?= $id_edit ?>">
                        <div class="label">
                            <h2>Editar Contato</h2>
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
                        <a class="button left" href="show.php?id=<?=$id_edit?>">Visualizar</a>
                        <a class="button error" href="index.php">Cancelar</a>
                        <button class="warning right" type="submit">Atualizar</button>        
                        <div class="label error edit-message"></div>
                    </form>
                </div>
        <div>
            <form method="post" enctype="multipart/form-data" class="photo-form">
                <input type="hidden" name="contact_id" id="contact_id" value="<?= $id_edit ?>">
                <div class="label"><h2>Adicionar Foto</h2></div>
                <div class="flex two">
                <div style="width: 100px;">                    
                    <label class="dropimage">
                        <input title="Arraste o arquivo ou clique para selecionar (somente imagens JPG ou PNG)" type="file" name="photo" id="photo" value="<?= rand(0, 1000000) ?>">
                    </label>                    
                </div>
                    <div>
                        <button class="half" type="submit" id="sendPhotoButton">Enviar foto</button>
                    </div>                    
                </div>                                
                <div class="label error photo-message"></div>
            </form>
            <div class="flex images-cards"><div>
            <div class="modal">
                <input type="hidden" id="photo_delete_id">
                <input type="hidden" id="photo_filename">
                <input id="modal_1" type="checkbox" />
                <label for="modal_1" class="overlay"></label>
                <article>
                    <header>
                        <h3>Aviso</h3>
                        <label for="modal_1" class="close">&times;</label>
                    </header>
                    <section class="content">
                        Deseja realmente deletar essa foto?
                    </section>
                    <footer>
                        <button class="button" onclick="document.getElementById('modal_1').checked = false">Não</button>
                        <label for="modal_1" class="button dangerous" onclick="deletePhoto()">Sim, deletar</label>
                    </footer>
                </article>
            </div>
        </div>
    </div>
  </div>
</div>                
    </main>
    <?php include_once("./partials/footer.php"); ?>
</div>

<script src="../assets/js/edit.js"></script>
<script src="../assets/js/photo.js"></script>
<script src="../assets//js/modal.js"></script>