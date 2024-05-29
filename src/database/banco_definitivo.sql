create database ArtCare;
use ArtCare;


create table verificacao (
	idVerificacao int primary key auto_increment,
    tempMax decimal(4,2) not null,
    tempMin decimal(4,2) not null,
    umiMax decimal(4,2) not null,
    umiMin decimal(4,2) not null
);

create table endereco (
	idEndereco int primary key auto_increment,
    cep char(9) not null,
    numEnd varchar(45) not null,
    complemento varchar(60)
);

create table museu (
	idMuseu int primary key auto_increment,
    fkEndereco int,
    nome varchar(45) not null,
    cnpj char(14) not null unique,
    rm char(9) not null unique,
    constraint fkEnderecoCliente foreign key (fkEndereco) references endereco (idEndereco)
);

create table representante (
idRepresentante int primary key auto_increment,
fkMuseu int,
foreign key (fkMuseu) references museu(idMuseu),
nome varchar(45) not null,
email varchar(256) not null,	 	
senha varchar(45) not null
);


create table sensor (
	idSensor int primary key auto_increment,
    nome char(5) default 'dht11',
    tipo varchar(45) default 'temperatura, umidade',
    constraint chkNomeSensor check (nome in ('dht11'))
);

create table supervisor (
	idSupervisor int primary key auto_increment,
    nome varchar(45) not null,
    email varchar(256) not null,
    senha varchar(45) not null,
   fkMuseu int,
    foreign key (fkMuseu) references museu(idMuseu)
);

create table setor (
	idSetor int auto_increment,
    fkSensor int,
    fkMuseu int,
    fkVerificacao int,
    nome varchar(45) not null,
    andar int not null,
    statusSetor int,
    constraint pkCompostaSetor primary key (idSetor, fkSensor, fkMuseu, fkVerificacao),
    constraint fkSensorDoSetor foreign key (fkSensor) references sensor (idSensor),
    constraint fkMuseuDoSetor foreign key (fkMuseu) references museu (idMuseu),
    constraint fkVerificacaoDoSetor foreign key (fkVerificacao) references verificacao (idVerificacao)
);

create table visualizacao (
idVisualizacao int auto_increment,
fkSetor int,
fkSensor int,
fkMuseu int,
	constraint pkCompostaVisualizacao primary key (idVisualizacao, fkSetor, fkSensor, fkMuseu),
    constraint fkSetorVisualizacao foreign key (fkSetor) references setor(idSetor),
    constraint fkSensorVisualizacao foreign key (fkSensor) references sensor(idSensor),
    constraint fkMuseuVisualizacao foreign key (fkMuseu) references museu(idMuseu)
);

create table registro (
	idRegistro int auto_increment,
    fkSensor int,
    umidade decimal(4,2),
    temperatura decimal(4,2),
    dtRegistro timestamp not null default current_timestamp,
    constraint pkCompostaRegistro primary key (idRegistro, fkSensor),
    constraint fkSensorRegistro foreign key (fkSensor) references sensor (idSensor)
);

desc registro;
-- Necessário alterar INSERTS e SELECTS
insert into verificacao (tempMax, tempMin, umiMax, umiMin) values
(20.00, 18.00, 45.00, 40.00);

insert into endereco (cep, numEnd, complemento) values
('08140-060', '979', 'próximo à avenida paulista');

insert into museu (fkEndereco, nome, cnpj, rm) values
(1, 'masp', '12345678909876', '520485530');

insert into sensor (nome, tipo) values
('dht11', 'temperatura, umidade');

insert into supervisor (nome, email, senha, fkMuseu) values
('bruno', 'bruno.oliveira@gmail.com', 'Bruninho321', 1);

insert into setor (fkSensor, fkMuseu, fkVerificacao, nome, andar, statusSetor) values
(1, 1, 1, 'Arte grega', 2, 3),
(1, 1, 1, 'Esculturas', 7, 2),
(1, 1, 1, 'Antiguidades egipcias', 2, 1),
(1, 1, 1, 'Arte Romana', 1, 3);

insert into registro (fkSensor, temperatura, umidade) values
(1, 31.00, 26.00);

select * from representante;
insert into representante (fkMuseu, nome, email, senha) values 
(1, "Julia", "juliaararipe@gmail.com", "12345678");

SELECT idMuseu FROM museu ORDER BY idMuseu DESC LIMIT 1;

delete from museu where idMuseu = 15;
select * from museu;
select idSetor, nome, statusSetor from setor order by statusSetor DESC;


select * from setor where statusSetor = 3;
select count(statusSetor) from setor where statusSetor = 2;

select round((umidade),0), round((temperatura),0) from setor join sensor on setor.fkSensor = idSensor join registro on registro.fkSensor = idSensor where idSetor = 3 order by idRegistro DESC limit 1;

select max(temperatura) from setor join registro on setor.fkSensor = registro.fkSensor;

select * from museu;
select * from endereco;
select * from supervisor;
select * from representante;
select * from setor;
select * from sensor;
select * from registro;
select temperatura from registro;
select * from verificacao;
