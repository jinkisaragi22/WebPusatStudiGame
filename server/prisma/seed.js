const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const game1 = await prisma.games.create({
    data: {
      id: 1,
      title: "Abandoned",
      game_detail:
        "Abandoned adalah sebuah permainan bertema horor yang dapat dimainkan menggunakan komputer. Permainan ini dibangun menggunakan Unreal Engine 4 versi 4.27.2. Karakter utama dalam permainan ini adalah seorang detektif yang ingin mencari tahu ada apa dibalik banyaknya korban yang ada di suatu rumah misterius. Abandoned menyajikan permainan yang bernuansa horor dengan tujuan mencari informasi mengenai kejadian-kejadian yang terjadi di rumah tersebut. Pemain akan memulai permainan di depan rumah misterius dan ketika pemain masuk ke dalam rumah tersebut, berbagai kejadian aneh mulai dirasakan oleh pemain tersebut. Pemain harus menyelesaikan berbagai teka-teki yang ada di rumah tersebut untuk dapat menemukan petunjuk yang ada di rumah tersebut.",
      category: "Horror",
      developer:
        "Christian Trisno Sen Long Chen - 219116782, David Cahyadi - 219116784, Jonathan Arelio Bevan - 219116789, Williandy Takhta - 219116798",
      publisher: "Hendrawan Armanto, S.Kom., M.Kom.",
      cover: "https://picsum.photos/id/1/600/300",
    },
  });
  const game2 = await prisma.games.create({
    data: {
      id: 2,
      title: "Story of A King",
      game_detail:
        "Untuk cerita pada game kami akan sedikit berbeda. Kami memilih untuk mengambil creative freedom atau kebebasan untuk berkreasi sehingga kami memutuskan untuk mengubah sedikit plot dan alur jalannya cerita agar lebih dapat digunakan sebagi backstory pada game serta terasa narasinya saat diimplementasikan pada gameplay. Mengingat bahwa genre utama dari game kami adalah platformer. Berdasarkan cerita yang telah kami buat, secara umum akan terdapat tiga level. Level pertama yang bertema padang pasir tempat Sun Wukong turun dari surga, level kedua bertema hutan yang dijalahi Sun Wukong dan level ketiga berupa gunung surgawi dengan hal-hal ajaib. Pada setiap transisi level, akan ada dialog sederhana dari Sun Wukong dan Buddha mengenai persik keabadian. Dan pada level terakhir, di mana Sun Wukong akan mengecilkan dan membesarkan dirinya, akan dibuat beberapa event khusus untuk gameplay tersebut.",
      category: "Platformer",
      developer: "David Brave Navy Putra",
      publisher: "Hendrawan Armanto, S.Kom., M.Kom.",
      cover: "https://picsum.photos/id/2/600/300",
    },
  });
  const game3 = await prisma.games.create({
    data: {
      id: 3,
      title: "Caarog",
      game_detail: `Pada masa depan yang penuh dengan kelangkaan sumber daya, dunia terbelah oleh persaingan untuk menguasai satu sumber energi yang sangat berharga. Sumber energi ini mampu mengubah nasib sebuah negara, baik itu untuk mendorong kemajuan atau memanfaatkannya sebagai senjata mematikan. Untuk mencegah konflik global yang tak terhindarkan, negara-negara sepakat mengadakan sebuah turnamen epik yang dikenal dengan nama "Caarog". Caarog, turnamen pertempuran satu lawan satu, menjadi cara untuk menyelesaikan sengketa tanpa membuang banyak darah. Setiap negara mengirimkan jagoan terkuat mereka ke arena pertempuran. Peserta turnamen mewakili negara mereka dengan keahlian khusus, senjata mutakhir, dan kekuatan luar biasa. Dalam lingkungan pertarungan futuristik yang spektakuler, mereka saling berhadapan untuk membuktikan dominasi mereka dan mengamankan sumber energi yang menjadi taruhannya. Para jagoan menghadapi tantangan berat dan musuh-musuh tangguh di setiap pertandingan Caarog. Setiap pertempuran menjadi panggung spektakuler yang memamerkan keterampilan tempur yang luar biasa dan strategi yang brilian. Tidak hanya kemampuan fisik, tetapi juga kecerdasan taktis dan daya adaptasi menjadi kunci untuk meraih kemenangan. Namun, Caarog bukan hanya sekadar pertempuran. Di balik panggung, ada intrik politik, aliansi rahasia, dan konspirasi yang merayap di antara negara-negara peserta. Para jagoan juga harus berurusan dengan dilema moral dan mempertanyakan tujuan mereka sendiri dalam pertempuran ini. Mereka terjebak dalam perang kuasa yang lebih besar, sambil berusaha menjaga integritas dan kebenaran yang mereka pegang teguh. Melalui pertarungan-pertarungan seru dan petualangan mendebarkan, para jagoan tumbuh sebagai pahlawan yang dihormati dan pemimpin inspirasional. Mereka menemukan bahwa kekuatan sejati bukan hanya dalam keahlian bertarung, tetapi juga dalam tekad untuk menciptakan dunia yang lebih baik. Sementara persaingan sengit terus berlanjut, solidaritas dan kerjasama antara para jagoan tumbuh, menginspirasi masyarakat di seluruh dunia untuk menentang perebutan sumber energi dengan kekerasan. Akhirnya, melalui ketabahan, pengorbanan, dan semangat persatuan, para jagoan memutuskan untuk berkolaborasi dan mencari solusi yang adil untuk membagi sumber energi yang berharga tersebut.`,
      category: "Action-Thrid Person Shooter",
      developer: `Daniel Gamaliel - 220116870, Antonio Christopher - 220116906, Felix Fangs Nyoto - 220116917, Agustinus Ivan - 220116866`,
      publisher: "Hendrawan Armanto, S.Kom., M.Kom.",
      cover: "https://picsum.photos/id/3/600/300",
    },
  });
  const game4 = await prisma.games.create({
    data: {
      id: 4,
      title: "Overtime Worker",
      game_detail: `Anda berperan sebagai seorang karyawan bernama Alex yang harus menyelesaikan pekerjaan programming untuk memenuhi deadline dari bosnya. Setelah mengerjakan pekerjaan tersebut selama berjam-jam, Alex merasa sangat lelah dan akhirnya tertidur di atas meja kerjanya. Ketika Alex bangun, dia merasa sangat terkejut dengan kondisi lingkungan sekitar kantornya yang sangat gelap dan sunyi. Tidak ada orang yang masih berada di kantor dan pintu keluar telah terkunci. Alex merasa cemas dan khawatir, namun tiba-tiba menerima pesan dari bosnya yang mengatakan bahwa pintu keluar akan terbuka setelah Alex menyelesaikan tugas-tugas yang belum selesai di perusahaan tersebut. Selama Alex menyelesaikan tugas-tugas tersebut, dia mendengar rumor buruk tentang perusahaan tersebut. Salah satu rumor yang pernah terdengar adalah munculnya sosok penampakan mantan karyawan yang sudah meninggal di perusahaan tersebut. Alex merasa takut dan khawatir, namun tetap harus fokus menyelesaikan tugas-tugas tersebut.`,
      category: "Horror",
      developer: `Unknown Developer`,
      publisher: "Hendrawan Armanto, S.Kom., M.Kom.",
      cover: "https://picsum.photos/id/4/600/300",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
